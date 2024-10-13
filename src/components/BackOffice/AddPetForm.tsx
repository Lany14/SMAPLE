import {
  Button,
  Input,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Radio,
  RadioGroup,
  Textarea,
} from "@nextui-org/react";
import React, { useState } from "react";

const AddPetForm: React.FC = () => {
  const [formData, setFormData] = useState({
    petName: "",
    sex: "",
    species: "",
    breed: "",
    age: "",
    weight: "",
    colorSpecialMarkings: "",
  });

  const [errors, setErrors] = useState({
    petName: "",
    sex: "",
    species: "",
    breed: "",
    age: "",
    weight: "",
    colorSpecialMarkings: "",
  });

  const validateForm = () => {
    const newErrors = { ...errors };

    newErrors.petName = formData.petName ? "" : "Pet name is required.";
    newErrors.sex = formData.sex ? "" : "Please select the sex.";
    newErrors.species = formData.species ? "" : "Species is required.";
    newErrors.breed = formData.breed ? "" : "Breed is required.";
    newErrors.age =
      formData.age && !isNaN(Number(formData.age))
        ? ""
        : "Age must be a number.";
    newErrors.weight =
      formData.weight && !isNaN(Number(formData.weight))
        ? ""
        : "Weight must be a number.";

    setErrors(newErrors);

    // Return true if there are no errors
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Form submitted:", formData);
      // Perform form submission actions here (e.g., send data to the backend)
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <ModalContent>
      {(onClose) => (
        <form onSubmit={handleSubmit}>
          <ModalHeader className="justify-center text-center text-xl">
            Add Pet Record
          </ModalHeader>
          <ModalBody>
            <div className="gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Input
                    type="text"
                    label="Pet's Name"
                    id="petName"
                    name="petName"
                    value={formData.petName}
                    onChange={handleInputChange}
                    isInvalid={!!errors.petName}
                  />
                  {errors.sex && (
                    <span className="text-xs text-red-500">
                      {errors.petName}
                    </span>
                  )}
                </div>

                <div>
                  <RadioGroup
                    label="Sex"
                    orientation="horizontal"
                    value={formData.sex}
                    onValueChange={(value) =>
                      setFormData({ ...formData, sex: value })
                    }
                    isInvalid={!!errors.sex}
                  >
                    <Radio value="Male">Male</Radio>
                    <Radio value="Female">Female</Radio>
                  </RadioGroup>
                  {errors.sex && (
                    <span className="text-xs text-red-500">{errors.sex}</span>
                  )}
                </div>

                <div>
                  <Input
                    type="text"
                    label="Species"
                    placeholder="ex. Cat, Dog, etc."
                    id="species"
                    name="species"
                    value={formData.species}
                    onChange={handleInputChange}
                    // helperText={errors.species}
                    isInvalid={!!errors.species}
                  />
                  {errors.sex && (
                    <span className="text-xs text-red-500">
                      {errors.species}
                    </span>
                  )}
                </div>

                <div>
                  <Input
                    type="text"
                    label="Breed"
                    id="breed"
                    name="breed"
                    value={formData.breed}
                    onChange={handleInputChange}
                    // helperText={errors.breed}
                    isInvalid={!!errors.breed}
                  />
                  {errors.sex && (
                    <span className="text-xs text-red-500">{errors.breed}</span>
                  )}
                </div>

                <div>
                  <Input
                    type="text"
                    label="Age"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    // helperText={errors.age}
                    isInvalid={!!errors.age}
                  />
                  {errors.sex && (
                    <span className="text-xs text-red-500">{errors.age}</span>
                  )}
                </div>

                <div>
                  <Input
                    type="text"
                    label="Weight (in kg)"
                    id="weight"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    // helperText={errors.weight}
                    isInvalid={!!errors.weight}
                  />
                  {errors.sex && (
                    <span className="text-xs text-red-500">
                      {errors.weight}
                    </span>
                  )}
                </div>

                <Textarea
                  label="Color and Special Markings"
                  placeholder="Enter Pet Special Markings"
                  className="col-span-2"
                  name="specialMarkings"
                  value={formData.colorSpecialMarkings}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onClick={onClose}>
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

export default AddPetForm;
