"use client";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FormError } from "../FrontEnd/Site/Forms/FormError";
import { FormSuccess } from "../FrontEnd/Site/Forms/FormSuccess";

const AddPetForm: React.FC = () => {
  const [showNotificationError, setShowNotificationError] = useState(false);
  const [showNotificationSuccess, setShowNotificationSuccess] = useState(false);
  const [formData, setFormData] = useState({
    petName: "",
    petSex: "",
    petSpecies: "",
    petBreed: "",
    petBirthdate: "",
    petAge: "",
    petWeight: "",
    petColorAndMarkings: "",
  });

  const [errors, setErrors] = useState({
    petName: "",
    petSex: "",
    petSpecies: "",
    petBreed: "",
    petBirthdate: "",
    petAge: "",
    petWeight: "",
    petColorAndMarkings: "",
  });

  const validateForm = () => {
    const newErrors = { ...errors };

    newErrors.petName = formData.petName ? "" : "Pet name is required.";
    newErrors.petSex = formData.petSex ? "" : "Please select the sex.";
    newErrors.petSpecies = formData.petSpecies ? "" : "Species is required.";
    newErrors.petBreed = formData.petBreed ? "" : "Breed is required.";
    newErrors.petBirthdate = formData.petBirthdate
      ? ""
      : "Birth date is required.";
    newErrors.petAge = formData.petAge ? "" : "Age is required.";
    newErrors.petWeight =
      formData.petWeight && !isNaN(Number(formData.petWeight))
        ? ""
        : "Weight must be a number.";

    setErrors(newErrors);

    // Return true if there are no errors
    return Object.values(newErrors).every((error) => error === "");
  };

  const calculateAge = useCallback(
    (birthdate: string, petBirthdate: string) => {
      const today = new Date();
      const petBirthDate = new Date(petBirthdate);

      let petAgeYears = today.getFullYear() - petBirthDate.getFullYear();
      let petAgeMonths = today.getMonth() - petBirthDate.getMonth();

      if (petAgeMonths < 0) {
        petAgeYears--;
        petAgeMonths += 12;
      }

      if (today.getDate() < petBirthDate.getDate()) petAgeMonths--;

      const petAgeFormatted = `${petAgeYears} yr${petAgeYears !== 1 ? "s" : ""}${
        petAgeMonths > 0
          ? ` and ${petAgeMonths} mo${petAgeMonths !== 1 ? "s" : ""}`
          : ""
      }`;

      return { petAge: petAgeFormatted };
    },
    [],
  );

  useEffect(() => {
    if (formData.petBirthdate) {
      const { petAge } = calculateAge(
        formData.petBirthdate,
        formData.petBirthdate,
      );
      setFormData((prev) => ({ ...prev, petAge }));
    }
  }, [formData.petBirthdate, calculateAge]);

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      console.log(formData);

      try {
        const response = await fetch("/api/add-pet", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          console.log("Form submitted:", formData);
          setShowNotificationSuccess(false);
          // Reset form data
          setFormData({
            petName: "",
            petSex: "",
            petSpecies: "",
            petBreed: "",
            petBirthdate: "",
            petAge: "",
            petWeight: "",
            petColorAndMarkings: "",
          });
        } else {
          // Log the full response for debugging
          console.error("Error response:", await response.text());
          setShowNotificationError(true);
        }
      } catch (error) {
        console.error("Error adding pet:", error);
        toast.error("An unexpected error occurred.");
      }
    } else {
      console.log("Validation failed");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <Card className="p-4">
      <form onSubmit={handleSubmit}>
        <CardBody>
          {showNotificationError && <FormError message="Failed to add pet." />}
          {showNotificationSuccess && (
            <FormSuccess message="Pet added successfully." />
          )}
          <CardHeader className="flex gap-3">
            <div className="flex flex-col">
              <p className="text-md">Add Pet Profile</p>
              <p className="text-small text-default-500">
                Add a new pet profile to your account
              </p>
            </div>
          </CardHeader>
          <div className="gap-4 md:grid md:grid-cols-2">
            <Input
              isRequired
              label="Pet Name"
              name="petName"
              value={formData.petName}
              onChange={handleInputChange}
              isInvalid={!!errors.petName}
              errorMessage={errors.petName}
            />
            <Select
              isRequired
              label="Sex"
              name="petSex"
              value={formData.petSex}
              onChange={(e) =>
                handleInputChange({
                  target: { name: "petSex", value: e.target.value },
                } as React.ChangeEvent<HTMLInputElement>)
              }
              isInvalid={!!errors.petSex}
              errorMessage={errors.petSex}
            >
              <SelectItem key="male" value="Male">
                Male
              </SelectItem>
              <SelectItem key="female" value="Female">
                Female
              </SelectItem>
            </Select>
            <Input
              isRequired
              label="Species"
              name="petSpecies"
              value={formData.petSpecies}
              onChange={handleInputChange}
              isInvalid={!!errors.petSpecies}
              errorMessage={errors.petSpecies}
            />
            <Input
              isRequired
              label="Breed"
              name="petBreed"
              value={formData.petBreed}
              onChange={handleInputChange}
              isInvalid={!!errors.petBreed}
              errorMessage={errors.petBreed}
            />
            <div className="md:flex ">
              <Input
                isRequired
                type="date"
                label="Birthdate"
                name="petBirthdate"
                value={formData.petBirthdate}
                onChange={handleInputChange}
                max={new Date().toISOString().split("T")[0]}
                isInvalid={!!errors.petBirthdate}
                errorMessage={errors.petBirthdate}
              />
              <Input
                isRequired
                isReadOnly
                type="text"
                label="Age"
                name="petAge"
                value={formData.petAge}
                isInvalid={!!errors.petAge}
                errorMessage={errors.petAge}
              />
            </div>

            <Input
              isRequired
              label="Weight (in kg.)"
              name="petWeight"
              value={formData.petWeight}
              onChange={handleInputChange}
              isInvalid={!!errors.petWeight}
              errorMessage={errors.petWeight}
            />
            <Textarea
              placeholder="Describe your Pet"
              className="max-w col-span-2"
              label="Color and Markings"
              name="petColorAndMarkings"
              value={formData.petColorAndMarkings}
              onChange={handleInputChange}
              isInvalid={!!errors.petColorAndMarkings}
              errorMessage={errors.petColorAndMarkings}
            />
            {/* <Select
              items={users}
              label="Assigned to"
              className="max-w-xs"
              variant="bordered"
              classNames={{
                label: "group-data-[filled=true]:-translate-y-5",
                trigger: "min-h-16",
                listboxWrapper: "max-h-[400px]",
              }}
              listboxProps={{
                itemClasses: {
                  base: [
                    "rounded-md",
                    "text-default-500",
                    "transition-opacity",
                    "data-[hover=true]:text-foreground",
                    "data-[hover=true]:bg-default-100",
                    "dark:data-[hover=true]:bg-default-50",
                    "data-[selectable=true]:focus:bg-default-50",
                    "data-[pressed=true]:opacity-70",
                    "data-[focus-visible=true]:ring-default-500",
                  ],
                },
              }}
              popoverProps={{
                classNames: {
                  base: "before:bg-default-200",
                  content: "p-0 border-small border-divider bg-background",
                },
              }}
              renderValue={(items) => {
                return items.map((item) => (
                  <div key={item.key} className="flex items-center gap-2">
                    <Avatar
                      alt={item.data.name}
                      className="flex-shrink-0"
                      size="sm"
                      src={item.data.avatar}
                    />
                    <div className="flex flex-col">
                      <span>{item.data.name}</span>
                      <span className="text-tiny text-default-500">
                        ({item.data.email})
                      </span>
                    </div>
                  </div>
                ));
              }}
            >
              {(user) => (
                <SelectItem key={user.id} textValue={user.name}>
                  <div className="flex items-center gap-2">
                    <Avatar
                      alt={user.name}
                      className="flex-shrink-0"
                      size="sm"
                      src={user.avatar}
                    />
                    <div className="flex flex-col">
                      <span className="text-small">{user.name}</span>
                      <span className="text-tiny text-default-400">
                        {user.email}
                      </span>
                    </div>
                  </div>
                </SelectItem>
              )}
            </Select> */}
          </div>
        </CardBody>
        <div className="flex justify-end">
          <Button color="primary" type="submit">
            Done
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default AddPetForm;
