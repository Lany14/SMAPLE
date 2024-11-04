import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { ObjectId } from "mongodb";
import { Resend } from "resend";
import AddPetNotif from "@/components/Emails/AddPetNotif";

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const {
      // Pet basic information
      name,
      sex,
      species,
      breed,
      age,
      weight,
      colorAndMarkings,
      birthDate,
      ownerId,

      // Owner information
      ownerEmail,
      ownerFirstName,
      ownerLastName,

      // Optional medical records
      medicalHistory,
      medicines,
      antiparasitics,
      prescriptions,
      labResults,
      vaccinations,
    } = await request.json();

    // Create pet with a new ObjectId for petId
    const pet = await prisma.pet.create({
      data: {
        // petId: new ObjectId().toString(), // Generate a unique petId
        name,
        sex,
        species,
        breed,
        age,
        weight,
        colorAndMarkings,
        birthDate: birthDate ? new Date(birthDate) : null,
        owner: {
          connect: {
            id: ownerId,
            firstName: ownerFirstName,
            lastName: ownerLastName,
          },
        },

        // Create medical records if provided
        medicalHistories: medicalHistory
          ? {
              create: medicalHistory.map((record: any) => ({
                type: record.type,
                date: new Date(record.date),
                note: record.note,
                file: record.file,
              })),
            }
          : undefined,

        medicines: medicines
          ? {
              create: medicines.map((medicine: any) => ({
                name: medicine.name,
                startDate: new Date(medicine.startDate),
                endDate: medicine.endDate ? new Date(medicine.endDate) : null,
                interval: medicine.interval,
                dosage: medicine.dosage,
                note: medicine.note,
              })),
            }
          : undefined,

        antiparasitics: antiparasitics
          ? {
              create: antiparasitics.map((treatment: any) => ({
                name: treatment.name,
                dateAdministered: new Date(treatment.dateAdministered),
                petWeight: treatment.petWeight,
                nextTreatmentDate: treatment.nextTreatmentDate
                  ? new Date(treatment.nextTreatmentDate)
                  : null,
                veterinarian: treatment.veterinarian,
                vetLicenseNumber: treatment.vetLicenseNumber,
                note: treatment.note,
              })),
            }
          : undefined,

        prescriptions: prescriptions
          ? {
              create: prescriptions.map((prescription: any) => ({
                name: prescription.name,
                veterinarian: prescription.veterinarian,
                vetLicenseNumber: prescription.vetLicenseNumber,
                note: prescription.note,
                file: prescription.file,
              })),
            }
          : undefined,

        labResults: labResults
          ? {
              create: labResults.map((result: any) => ({
                name: result.name,
                datePerformed: new Date(result.datePerformed),
                note: result.note,
                file: result.file,
              })),
            }
          : undefined,

        vaccinations: vaccinations
          ? {
              create: vaccinations.map((vaccination: any) => ({
                dateAdministered: new Date(vaccination.dateAdministered),
                petWeight: vaccination.petWeight,
                name: vaccination.name,
                against: vaccination.against,
                nextVaccinationDate: vaccination.nextVaccinationDate
                  ? new Date(vaccination.nextVaccinationDate)
                  : null,
                veterinarian: vaccination.veterinarian,
                vetLicenseNumber: vaccination.vetLicenseNumber,
                manufacturer: vaccination.manufacturer,
                lotNumber: vaccination.lotNumber,
                note: vaccination.note,
                file: vaccination.file,
              })),
            }
          : undefined,
      },
    });

    await resend.emails.send({
      from: "Abys Agrivet <noreply@abysagrivet.online>",
      to: ownerEmail,
      subject: "Added a new pet to your profile",
      react: AddPetNotif({
        ownerFirstName,
        ownerLastName,
      }),
    });

    return NextResponse.json(
      { message: "Pet profile created successfully", pet },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating pet profile:", error);
    return NextResponse.json(
      { message: "Error creating pet profile" },
      { status: 500 },
    );
  }
}
