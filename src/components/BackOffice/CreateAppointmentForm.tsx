"use client";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const CreateAppointmentForm: React.FC = () => {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    petId: "",
    doctorId: "",
    appointmentDate: "",
    appointmentTime: "", // Renamed from startTime to appointmentTime for clarity
    note: "",
  });
  const [pets, setPets] = useState<any[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [errors, setErrors] = useState<any>({});
  const [isDoctorSelectable, setIsDoctorSelectable] = useState(false);
  const router = useRouter();

  // Fetch pets and doctors data on component load
  useEffect(() => {
    if (session?.user?.role === "PET_OWNER") {
      fetch("/api/pets")
        .then((res) => res.json())
        .then((data) => setPets(data));
    }

    fetch("/api/users/vet-docs")
      .then((res) => res.json())
      .then((data) => setDoctors(data));
  }, [session?.user]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prevData) => ({ ...prevData, appointmentDate: value }));
    setIsDoctorSelectable(!!value);
  };

  const handleInputChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const newErrors: any = {};
    if (!formData.petId) newErrors.petId = "Pet is required.";
    if (!formData.doctorId) newErrors.doctorId = "Doctor is required.";
    if (!formData.appointmentDate)
      newErrors.appointmentDate = "Date is required.";
    if (!formData.appointmentTime)
      newErrors.appointmentTime = "Time is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = validateForm();
    if (!isValid) return;

    const startTime = `${formData.appointmentDate}T${formData.appointmentTime}`;
    const payload = {
      petId: formData.petId,
      doctorId: formData.doctorId,
      startTime: new Date(startTime).toISOString(),
      note: formData.note || "",
    };

    console.log("Validating appointment:", payload);

    // Step 1: Check for overlap
    try {
      const checkResponse = await fetch("/api/appointments/check-overlap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const checkResult = await checkResponse.json();

      if (checkResult.isOverlap) {
        toast.error(
          "The selected time slot is already booked. Please choose another time.",
        );
        return;
      }

      // Step 2: Create appointment if no conflict
      const createResponse = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (createResponse.ok) {
        toast.success("Appointment created successfully!");
        router.push("/dashboard/appointments");
      } else {
        toast.error("Failed to create appointment. Please try again.");
      }
    } catch (error) {
      console.error("Error during appointment creation:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <Card className="p-4">
      <form onSubmit={handleSubmit}>
        <CardBody>
          <CardHeader className="flex gap-3">
            <div className="flex flex-col">
              <p className="text-md">Create Appointment</p>
              <p className="text-small text-default-500">
                Schedule a new appointment for your pet
              </p>
            </div>
          </CardHeader>
          <div className="gap-4 md:grid md:grid-cols-2">
            <Select
              isRequired
              label="Select Pet"
              name="petId"
              value={formData.petId}
              onChange={handleInputChange}
              isInvalid={!!errors.petId}
              errorMessage={errors.petId}
            >
              {pets.map((pet) => (
                <SelectItem key={pet.id} value={pet.id}>
                  {pet.petName}
                </SelectItem>
              ))}
            </Select>

            <Input
              isRequired
              label="Appointment Date"
              name="appointmentDate"
              type="date"
              value={formData.appointmentDate}
              onChange={handleDateChange}
              isInvalid={!!errors.appointmentDate}
              errorMessage={errors.appointmentDate}
            />

            <Select
              isRequired
              label="Select Doctor"
              name="doctorId"
              value={formData.doctorId}
              onChange={(e) => handleInputChange(e)}
              isDisabled={!isDoctorSelectable}
              isInvalid={!!errors.doctorId}
              errorMessage={errors.doctorId}
            >
              {doctors.map((doctor) => (
                <SelectItem key={doctor.id} value={doctor.id}>
                  {doctor.name}
                </SelectItem>
              ))}
            </Select>

            <Input
              isRequired
              label="Appointment Time"
              name="appointmentTime"
              type="time"
              value={formData.appointmentTime}
              onChange={handleInputChange}
              isInvalid={!!errors.appointmentTime}
              errorMessage={errors.appointmentTime}
            />

            <Textarea
              label="Additional Notes"
              name="note"
              value={formData.note}
              onChange={handleInputChange}
            />
          </div>
        </CardBody>
        <CardFooter className="flex justify-end">
          <Button color="primary" type="submit">
            Submit
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default CreateAppointmentForm;
