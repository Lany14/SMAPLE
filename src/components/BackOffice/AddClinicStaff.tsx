import {
  Button,
  Divider,
  Input,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import React from "react";

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
  return (
    <ModalContent>
      {(onClose) => (
        <form>
          <ModalHeader className="justify-center text-center text-xl">
            Add Clinic Staff
          </ModalHeader>
          <ModalBody>
            <div className="gap-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  isRequired
                  className=""
                  type="text"
                  label="First Name"
                  id="firstName"
                  name="firstName"
                />
                <Input
                  isRequired
                  className=""
                  type="text"
                  label="Last Name"
                  id="lastName"
                  name="lastName"
                />
                <Select
                  isRequired
                  items={SexProp}
                  label="Sex"
                  placeholder="Choose Sex"
                >
                  {(sex) => (
                    <SelectItem value={sex.label} key={sex.key}>
                      {sex.label}
                    </SelectItem>
                  )}
                </Select>
                <Input
                  isRequired
                  className=""
                  type="text"
                  label="Age"
                  id="age"
                  name="age"
                />
                <Input
                  isRequired
                  className="col-span-2"
                  type="email"
                  label="Email"
                  id="email"
                  name="email"
                />
                <Select
                  isRequired
                  items={RoleProp}
                  label="Clinic Role"
                  placeholder="Choose Clinic Role"
                  className="col-span-2"
                >
                  {(role) => (
                    <SelectItem value={role.label} key={role.key}>
                      {role.label}
                    </SelectItem>
                  )}
                </Select>
                <Divider className="col-span-2" />
                <Input
                  isRequired
                  className="col-span-2"
                  type="text"
                  label="Vet License Number"
                  id="licenseNumber"
                  name="licenseNumber"
                />
                <Textarea
                  className="col-span-2"
                  type="text"
                  label="Specialization"
                  id="specialization"
                  name="specialization"
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Close
            </Button>
            <Button color="primary" onPress={onClose}>
              Done
            </Button>
          </ModalFooter>
        </form>
      )}
    </ModalContent>
  );
};

export default AddClinicStaff;
