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
import React from "react";

const AddPetForm: React.FC = () => {
  return (
    <ModalContent>
      {(onClose) => (
        <form>
          <ModalHeader className="justify-center text-center text-xl">
            Add Pet Record
          </ModalHeader>
          <ModalBody>
            <div className="gap-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  className=""
                  type="text"
                  label="Pet's Name"
                  id="petName"
                  name="petName"
                />
                <RadioGroup label="Sex" orientation="horizontal">
                  <Radio value="Male">Male</Radio>
                  <Radio value="Female">Female</Radio>
                </RadioGroup>

                <Input
                  className=""
                  type="text"
                  label="Species"
                  placeholder="ex. Cat, Dog, etc."
                  id="species"
                  name="species"
                />
                <Input
                  className=""
                  type="text"
                  label="Breed"
                  id="breed"
                  name="breed"
                />
                <Input
                  className=""
                  type="text"
                  label="Age"
                  id="age"
                  name="age"
                />
                <Input
                  className=""
                  type="text"
                  label="Weight (in kg)"
                  id="weight"
                  name="weight"
                />
                <Input
                  className="col-span-2"
                  type="text"
                  label="Color"
                  id="color"
                  name="color"
                />
                <Textarea
                  label="Special Markings"
                  placeholder="Enter Pet Special Markings"
                  className="col-span-2"
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Close
            </Button>
            <Button color="primary" onPress={onClose}>
              Action
            </Button>
          </ModalFooter>
        </form>
      )}
    </ModalContent>
  );
};

export default AddPetForm;
