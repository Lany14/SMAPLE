import {
  Button,
  Divider,
  Input,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";

export const SexProp = [
  { key: "Male", label: "Male" },
  { key: "Female", label: "Female" },
];

export const RoleProp = [
  { key: "ADMIN", label: "ADMIN" },
  { key: "VET_NURSE", label: "VETERINARY NURSE" },
  { key: "VET_DOCTOR", label: "VETERINARY DOCTOR" },
  { key: "VET_RECEPTIONIST", label: "VETERINARY RECEPTIONIST" },
  { key: "PET_OWNER", label: "PET OWNER" },
];

const AddClinicStaff: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    sex: "",
    birthDate: "",
    age: "",
    email: "",
    role: "",
    licenseNumber: "",
    specialization: "",
  });

  const [errors, setErrors] = useState<any>({});

  const [phoneNumber, setPhoneNumber] = useState("");
  const [isValid, setIsValid] = useState(true);

  const calculateAge = (birthdate: string): number => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, ""); // Remove non-digit characters
    if (input.length <= 10) {
      setPhoneNumber(input);
      setIsValid(input.length === 10);
    }
  };

  useEffect(() => {
    if (formData.birthDate) {
      const calculatedAge = calculateAge(formData.birthDate);
      setFormData((prevData) => ({
        ...prevData,
        age: calculatedAge.toString(),
      }));
    }
  }, [formData.birthDate]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    if (name === "role" && value === "PET_OWNER") {
      // Clear Vet License Number and Specialization when role is PET_OWNER
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        licenseNumber: "", // Reset license number
        specialization: "", // Reset specialization
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = () => {
    let tempErrors: any = {};
    if (!formData.firstName) tempErrors.firstName = "First name is required";
    if (!formData.lastName) tempErrors.lastName = "Last name is required";
    if (!formData.sex) tempErrors.sex = "Sex is required";
    if (!formData.birthDate) tempErrors.birthDate = "Birthdate is required";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      tempErrors.email = "Valid email is required";
    if (!formData.role) tempErrors.role = "Role is required";
    if (formData.role !== "PET_OWNER" && !formData.licenseNumber)
      tempErrors.licenseNumber = "License number is required for this role";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
      // proceed with form submission (e.g., API call)
    } else {
      console.log("Validation failed");
    }
  };

  return (
    <ModalContent>
      {(onClose) => (
        <form onSubmit={handleSubmit}>
          <ModalHeader className="justify-center text-center text-xl">
            Add Staff or User
          </ModalHeader>
          <ModalBody>
            <div className="gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Input
                    isRequired
                    className=""
                    type="text"
                    label="First Name"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    isInvalid={!!errors.firstName}
                  />
                  {errors.firstName && (
                    <span className="text-xs text-red-500">
                      {errors.firstName}
                    </span>
                  )}
                </div>
                <div>
                  <Input
                    isRequired
                    className=""
                    type="text"
                    label="Last Name"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    isInvalid={!!errors.lastName}
                  />
                  {errors.lastName && (
                    <span className="text-xs text-red-500">
                      {errors.lastName}
                    </span>
                  )}
                </div>
                <div>
                  <Select
                    isRequired
                    label="Sex"
                    placeholder="Choose Sex"
                    value={formData.sex}
                    onChange={(e) => handleSelectChange("sex", e.target.value)}
                    isInvalid={!!errors.sex}
                  >
                    {SexProp.map((sex) => (
                      <SelectItem value={sex.key} key={sex.key}>
                        {sex.label}
                      </SelectItem>
                    ))}
                  </Select>
                  {errors.sex && (
                    <span className="text-xs text-red-500">{errors.sex}</span>
                  )}
                </div>
                <div className="flex grid-cols-2 gap-4 ">
                  <div>
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
                    />
                    {errors.birthDate && (
                      <span className="text-xs text-red-500">
                        {errors.birthDate}
                      </span>
                    )}
                  </div>
                  <div>
                    <Input
                      isRequired
                      isReadOnly
                      type="number"
                      label="Age"
                      id="age"
                      name="age"
                      value={formData.age}
                    />
                  </div>
                </div>

                <div className="col-span-2 space-y-4">
                  <div>
                    <Input
                      isRequired
                      type="email"
                      label="Email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      isInvalid={!!errors.email}
                    />
                    {errors.email && (
                      <span className="text-xs text-red-500">
                        {errors.email}
                      </span>
                    )}
                  </div>
                  <div>
                    <Input
                      label="Phone Number"
                      placeholder="Enter 10 digit number"
                      value={phoneNumber ? `+63 ${phoneNumber}` : ""}
                      onChange={handlePhoneChange}
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
                        input: "pl-1", // Add left padding to input to prevent overlap with country code
                        innerWrapper: "bg-transparent",
                      }}
                    />
                  </div>
                  <div>
                    <Select
                      isRequired
                      label="Clinic Role"
                      placeholder="Choose Clinic Role"
                      value={formData.role}
                      onChange={(e) =>
                        handleSelectChange("role", e.target.value)
                      }
                      className="col-span-2"
                      isInvalid={!!errors.role}
                    >
                      {RoleProp.map((role) => (
                        <SelectItem value={role.key} key={role.key}>
                          {role.label}
                        </SelectItem>
                      ))}
                    </Select>
                    {errors.role && (
                      <span className="text-xs text-red-500">
                        {errors.role}
                      </span>
                    )}
                  </div>
                </div>

                {formData.role !== "PET_OWNER" && (
                  <>
                    <Divider className="col-span-2" />
                    <Input
                      isRequired
                      className="col-span-2"
                      type="text"
                      label="Vet License Number"
                      id="licenseNumber"
                      name="licenseNumber"
                      value={formData.licenseNumber}
                      onChange={handleInputChange}
                      isInvalid={!!errors.licenseNumber}
                    />
                    {errors.licenseNumber && (
                      <span className="text-xs text-red-500">
                        {errors.licenseNumber}
                      </span>
                    )}

                    <Textarea
                      className="col-span-2"
                      type="text"
                      label="Specialization"
                      id="specialization"
                      name="specialization"
                      value={formData.specialization}
                      onChange={handleInputChange}
                    />
                  </>
                )}
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Close
            </Button>
            <Button color="primary" type="submit">
              Done
            </Button>
          </ModalFooter>
        </form>
      )}
    </ModalContent>
  );
};

export default AddClinicStaff;
