"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  Tabs,
  Tab,
  Input,
  Button,
  Card,
  CardBody,
  SelectItem,
  Select,
  Divider,
  Textarea,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { TrashIcon } from "lucide-react";

interface FormData {
  // Personal Data
  firstName: string;
  lastName: string;
  email: string;
  sex: string;
  address: string;
  phoneNumber: string;
  birthDate: string;
  age: string;
  streetAddress: string;
  city: string;
  province: string;
  barangay: string;
  zipCode: string;

  // Pet Data
  petName: string;
  petSex: string;
  petSpecies: string;
  petBreed: string;
  petBirthdate: string;
  petAge: string;
  petWeight: string;
  petColorAndMarkings: string;
}

interface FormErrors {
  // Personal Data
  firstName?: string;
  lastName?: string;
  email?: string;
  sex?: string;
  address?: string;
  phoneNumber?: string;
  birthDate?: string;
  age?: string;
  streetAddress?: string;
  city?: string;
  province?: string;
  barangay?: string;
  zipCode?: string;

  // Pet Data
  petName?: string;
  petSex?: string;
  petSpecies?: string;
  petBreed?: string;
  petBirthdate?: string;
  petAge?: string;
  petWeight?: string;
  petColorAndMarkings?: string;
}

interface PetProfile {
  petName: string;
  petSex: string;
  petSpecies: string;
  petBreed: string;
  petBirthdate: string;
  petAge: string;
  petWeight: string;
  petColorAndMarkings: string;
}

export const SexProp = [
  { key: "Male", label: "Male" },
  { key: "Female", label: "Female" },
] as const;

const INITIAL_FORM_DATA: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  sex: "",
  address: "",
  phoneNumber: "",
  birthDate: "",
  age: "",
  streetAddress: "",
  city: "",
  province: "",
  barangay: "",
  zipCode: "",
  petName: "",
  petSex: "",
  petSpecies: "",
  petBreed: "",
  petBirthdate: "",
  petAge: "",
  petWeight: "",
  petColorAndMarkings: "",
};

const INITIAL_PET_PROFILE: PetProfile = {
  petName: "",
  petSex: "",
  petSpecies: "",
  petBreed: "",
  petBirthdate: "",
  petAge: "",
  petWeight: "",
  petColorAndMarkings: "",
};

const PetOwnerOnboardingForm = () => {
  const { data: session } = useSession();
  const [selected, setSelected] = useState("personal");
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [petProfiles, setPetProfiles] = useState<PetProfile[]>([]);
  const [currentPet, setCurrentPet] = useState<PetProfile>(INITIAL_PET_PROFILE);
  const [errors, setErrors] = useState<FormErrors>({});
  const [phoneNumber, setPhoneNumber] = useState("");

  const tabs = useMemo(() => ["personal", "addPet", "addPaymentInfo"], []);
  const currentIndex = tabs.indexOf(selected);

  const isValid = phoneNumber.length === 10;

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: "" }));
    },
    [],
  );

  const handlePetInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      const petFieldName = `pet${name.charAt(0).toUpperCase() + name.slice(1)}`;
      setCurrentPet((prev) => ({ ...prev, [petFieldName]: value }));
      setErrors((prev) => ({ ...prev, [petFieldName]: "" }));
    },
    [],
  );

  const validateForm = useCallback(() => {
    const newErrors: FormErrors = {};
    const requiredFields = {
      firstName: "First name",
      lastName: "Last name",
      birthDate: "Birth date",
      email: "Email",
      sex: "Sex",
      phoneNumber: "Phone number",
      age: "Age",
      streetAddress: "Street address",
      city: "City",
      province: "Province",
      barangay: "Barangay",
      zipCode: "Zip code",
    };

    Object.entries(requiredFields).forEach(([field, label]) => {
      if (!formData[field as keyof FormData]?.trim()) {
        newErrors[field as keyof FormErrors] = `${label} is required`;
      }
    });

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const validatePetForm = useCallback(() => {
    const newErrors: FormErrors = {};
    const requiredFields = {
      petName: "Pet name",
      petSex: "Sex",
      petSpecies: "Species",
      petBreed: "Breed",
      petBirthdate: "Birthdate",
      petAge: "Age",
      petWeight: "Weight",
    };

    Object.entries(requiredFields).forEach(([field, label]) => {
      if (!currentPet[field as keyof PetProfile]?.trim()) {
        newErrors[field as keyof FormErrors] = `${label} is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [currentPet]);

  const handleAddPet = useCallback(() => {
    if (validatePetForm()) {
      setPetProfiles((prev) => [...prev, currentPet]);
      setCurrentPet(INITIAL_PET_PROFILE);
    }
  }, [currentPet, validatePetForm]);

  const handleDeletePet = useCallback((indexToDelete: number) => {
    setPetProfiles((prev) =>
      prev.filter((_, index) => index !== indexToDelete),
    );
  }, []);

  const handlePhoneChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target.value.replace(/[^0-9]/g, "");
      if (input.length <= 10 && (!input.length || input[0] === "9")) {
        setPhoneNumber(input);
      }
    },
    [],
  );

  const calculateAge = useCallback(
    (birthdate: string, petBirthdate: string) => {
      const today = new Date();
      const birthDate = new Date(birthdate);
      const petBirthDate = new Date(petBirthdate);

      let ageYears = today.getFullYear() - birthDate.getFullYear();
      let petAgeYears = today.getFullYear() - petBirthDate.getFullYear();
      let ageMonths = today.getMonth() - birthDate.getMonth();
      let petAgeMonths = today.getMonth() - petBirthDate.getMonth();

      if (ageMonths < 0) {
        ageYears--;
        ageMonths += 12;
      }
      if (petAgeMonths < 0) {
        petAgeYears--;
        petAgeMonths += 12;
      }

      if (today.getDate() < birthDate.getDate()) ageMonths--;
      if (today.getDate() < petBirthDate.getDate()) petAgeMonths--;

      const petAgeFormatted = `${petAgeYears} yr${petAgeYears !== 1 ? "s" : ""}${
        petAgeMonths > 0
          ? ` and ${petAgeMonths} mo${petAgeMonths !== 1 ? "s" : ""}`
          : ""
      }`;

      return { age: ageYears, petAge: petAgeFormatted };
    },
    [],
  );

  useEffect(() => {
    if (formData.birthDate && currentPet.petBirthdate) {
      const { age, petAge } = calculateAge(
        formData.birthDate,
        currentPet.petBirthdate,
      );
      setFormData((prev) => ({ ...prev, age: age.toString() }));
      setCurrentPet((prev) => ({ ...prev, petAge }));
    }
  }, [formData.birthDate, currentPet.petBirthdate, calculateAge]);

  const handleSubmit = useCallback(() => {
    if (validateForm()) {
      const fullPhoneNumber = `+63${phoneNumber}`;
      const fullAddress = `${formData.streetAddress}, ${formData.city}, ${formData.province}, ${formData.barangay}, ${formData.zipCode}`;

      const userData = {
        ...formData,
        phoneNumber: fullPhoneNumber,
        address: fullAddress,
        pets: petProfiles,
      };

      // Here you would typically send the data to your server
      console.log("Form submitted:", userData);
      alert("Onboarding completed successfully!");
    }
  }, [formData, phoneNumber, petProfiles, validateForm]);

  const handleNext = useCallback(() => {
    if (currentIndex < tabs.length - 1) {
      setSelected(tabs[currentIndex + 1]);
    }
  }, [currentIndex, tabs]);

  const handlePrevious = useCallback(() => {
    if (currentIndex > 0) {
      setSelected(tabs[currentIndex - 1]);
    }
  }, [currentIndex, tabs]);

  // Rest of the JSX remains the same...
  return (
    <div className="mx-auto max-w-4xl p-4">
      <Tabs
        selectedKey={selected}
        onSelectionChange={(key) => setSelected(key as string)}
        aria-label="Onboarding steps"
      >
        <Tab key="personal" title="Personal Info">
          <Card>
            <CardBody className="p-8">
              <form className="grid grid-cols-2 gap-4 ">
                <Input
                  isRequired
                  label="First Name"
                  name="firstName"
                  value={session?.user?.firstName || formData.firstName}
                  onChange={handleInputChange}
                  isInvalid={!!errors.firstName}
                  errorMessage={errors.firstName}
                />
                <Input
                  isRequired
                  label="Last Name"
                  name="lastName"
                  value={session?.user?.lastName || formData.lastName}
                  onChange={handleInputChange}
                  isInvalid={!!errors.lastName}
                  errorMessage={errors.lastName}
                />
                <Select
                  isRequired
                  label="Sex"
                  placeholder="Choose Sex"
                  value={formData.sex}
                  isInvalid={!!errors.sex}
                  errorMessage={errors.sex}
                >
                  {SexProp.map((sex) => (
                    <SelectItem value={sex.key} key={sex.key}>
                      {sex.label}
                    </SelectItem>
                  ))}
                </Select>
                <Input
                  isRequired
                  className=""
                  type="date"
                  label="Birthdate"
                  id="birthDate"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleInputChange}
                  max={new Date().toISOString().split("T")[0]}
                  isInvalid={!!errors.birthDate}
                  errorMessage={errors.birthDate}
                />
                <Input
                  isRequired
                  isReadOnly
                  type="number"
                  label="Age"
                  id="age"
                  name="age"
                  value={formData.age}
                  isInvalid={!!errors.age}
                  errorMessage={errors.age}
                />
                <Input
                  isRequired
                  label="Phone Number"
                  placeholder="ex. 9XXXXXXXXX"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  startContent={<span className="text-small">+63</span>}
                  endContent={
                    <div className="pointer-events-none flex items-center">
                      <span
                        className={`text-small ${isValid ? "text-success" : "text-danger"}`}
                      >
                        {phoneNumber.length}/10
                      </span>
                    </div>
                  }
                  type="tel"
                  isInvalid={!isValid && phoneNumber.length > 0}
                  errorMessage={
                    !isValid && phoneNumber.length > 0
                      ? "Phone number must be 10 digits"
                      : ""
                  }
                  classNames={{
                    input: "pl-1",
                    innerWrapper: "bg-transparent",
                  }}
                />
                <div className="col-span-2">
                  <Divider className="my-4" />
                </div>
                <Input
                  isRequired
                  className="col-span-2"
                  label="Street Address"
                  name="streetAddress"
                  value={formData.streetAddress}
                  onChange={handleInputChange}
                  isInvalid={!!errors.streetAddress}
                  errorMessage={errors.streetAddress}
                />
                <Input
                  isRequired
                  label="Province"
                  name="province"
                  value={formData.province}
                  onChange={handleInputChange}
                  isInvalid={!!errors.province}
                  errorMessage={errors.province}
                />
                <Input
                  isRequired
                  label="Municipality/City"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  isInvalid={!!errors.city}
                  errorMessage={errors.city}
                />
                <Input
                  isRequired
                  label="Barangay"
                  name="barangay"
                  value={formData.barangay}
                  onChange={handleInputChange}
                  isInvalid={!!errors.barangay}
                  errorMessage={errors.barangay}
                />
                <Input
                  isRequired
                  label="Zip Code"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  isInvalid={!!errors.zipCode}
                  errorMessage={errors.zipCode}
                />
              </form>
            </CardBody>
          </Card>
        </Tab>
        <Tab key="addPet" title="Pet Info">
          <Card>
            <CardBody className="p-8">
              <h3 className="text-lg font-semibold">Added Pets:</h3>
              {petProfiles.map((pet, index) => (
                <div
                  key={index}
                  className="flex justify-between rounded-xl border border-default-200 p-4"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <div className="flex flex-col">
                      <span>{pet.petName}</span>
                      <span className="text-tiny text-default-500">
                        {pet.petSpecies}
                      </span>
                      <span className="text-tiny text-default-500">
                        {pet.petBreed}
                      </span>
                    </div>
                  </div>
                  <div>
                    <Button
                      className="items-center"
                      isIconOnly
                      color="danger"
                      onClick={() => handleDeletePet(index)}
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              <div>
                <form className="grid grid-cols-2 gap-4">
                  <Input
                    isRequired
                    label="Pet Name"
                    name="name"
                    value={currentPet.petName}
                    onChange={handlePetInputChange}
                    isInvalid={!!errors.petName}
                    errorMessage={errors.petName}
                  />
                  <Select
                    isRequired
                    label="Sex"
                    name="sex"
                    value={currentPet.petSex}
                    onChange={(e) =>
                      handlePetInputChange({
                        target: { name: "sex", value: e.target.value },
                      } as React.ChangeEvent<HTMLInputElement>)
                    }
                    isInvalid={!!errors.petSex}
                    errorMessage={errors.petSex}
                  >
                    <SelectItem key="male" value="male">
                      Male
                    </SelectItem>
                    <SelectItem key="female" value="female">
                      Female
                    </SelectItem>
                  </Select>
                  <Input
                    isRequired
                    label="Species"
                    name="species"
                    value={currentPet.petSpecies}
                    onChange={handlePetInputChange}
                    isInvalid={!!errors.petSpecies}
                    errorMessage={errors.petSpecies}
                  />
                  <Input
                    isRequired
                    label="Breed"
                    name="breed"
                    value={currentPet.petBreed}
                    onChange={handlePetInputChange}
                    isInvalid={!!errors.petBreed}
                    errorMessage={errors.petBreed}
                  />
                  <Input
                    isRequired
                    type="date"
                    label="Birthdate"
                    name="birthdate"
                    value={currentPet.petBirthdate}
                    onChange={handlePetInputChange}
                    max={new Date().toISOString().split("T")[0]}
                    isInvalid={!!errors.petBirthdate}
                    errorMessage={errors.petBirthdate}
                  />
                  <Input
                    isRequired
                    isReadOnly
                    type="text"
                    label="Age"
                    name="age"
                    value={currentPet.petAge}
                    isInvalid={!!errors.petAge}
                    errorMessage={errors.petAge}
                  />
                  <Input
                    isRequired
                    label="Weight"
                    name="weight"
                    value={currentPet.petWeight}
                    onChange={handlePetInputChange}
                    isInvalid={!!errors.petWeight}
                    errorMessage={errors.petWeight}
                  />
                  <Textarea
                    placeholder="Describe your Pet"
                    className="max-w col-span-2"
                    label="Color and Markings"
                    name="colorAndMarkings"
                    value={currentPet.petColorAndMarkings}
                    onChange={handlePetInputChange}
                    isInvalid={!!errors.petColorAndMarkings}
                    errorMessage={errors.petColorAndMarkings}
                  />
                  <Button onClick={handleAddPet} color="primary">
                    Add Pet
                  </Button>
                </form>
              </div>
            </CardBody>
          </Card>
        </Tab>
        <Tab key="addPaymentInfo" title="Payment Info">
          <Card>
            <CardBody>
              <p>Payment Info details will be displayed here.</p>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
      <div className="mt-4 flex justify-between">
        <Button onClick={handlePrevious} disabled={currentIndex === 0}>
          Previous
        </Button>
        {currentIndex === tabs.length - 1 ? (
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            disabled={currentIndex === tabs.length - 1}
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default PetOwnerOnboardingForm;