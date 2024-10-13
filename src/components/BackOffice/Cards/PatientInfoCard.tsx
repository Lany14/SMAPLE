import React from "react";
import Image from "next/image";
import { PetDocumentTable } from "./PetDocumentTable";
import { Divider } from "@nextui-org/react";
import { VaccineChip } from "./VaccineChip";

export const PatientInfoCard = () => {
  return (
    <div className="overflow-hidden rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark  dark:shadow-card">
      <div className="space-y-5">
        <div className="flex items-center gap-4">
          <Image
            src="/images/user/user-03.png"
            width={80}
            height={80}
            className="overflow-hidden rounded-full"
            alt="pet photo"
          />
          <div className="space-y-1">
            <p className="text-heading-5 font-bold ">Name </p>
            <div className="text- flex h-5 items-center space-x-4 font-normal">
              <p>Gender</p>
              <Divider orientation="vertical" />
              <p>Age</p>
            </div>
            <h2 className="h-5 font-normal">ID 1234-4567</h2>
          </div>
        </div>

        <div className="space-y-1 text-body-sm font-semibold">
          <p>
            Date of Birth: <p className="text-sm font-normal"></p>
          </p>
          <p>
            Address: <p className="text-sm font-normal"></p>
          </p>
          <p>
            Breed: <p className="text-sm font-normal"></p>
          </p>
          <p className="flex gap-2">
            Vaccinated: <VaccineChip />
          </p>
          <p className="break-normal">Color & Markings: </p>
          <p className="text-sm font-normal">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto omnis
            nostrum sed soluta, atque harum saepe blanditiis, ut, at earum
            accusamus temporibus consequuntur est alias aperiam inventore animi
            repudiandae quasi.
          </p>
          <div className="flex gap-2"></div>

          <p>Last Check Up:</p>
        </div>
      </div>
    </div>
  );
};
