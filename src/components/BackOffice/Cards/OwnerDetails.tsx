import { Button } from "@nextui-org/react";
import { Mail, Phone } from "lucide-react";
import React from "react";

export const OwnerDetails = () => {
  return (
    <div className="overflow-hidden rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <p className="text-heading-6 font-bold">Owner Details</p>
          <div className="space-x-2">
            <Button isIconOnly className="rounded-full">
              <Mail size={16} />
            </Button>
            <Button isIconOnly className="rounded-full">
              <Phone size={16} />
            </Button>
          </div>
        </div>
        <div className="space-y-1 text-body-sm font-semibold">
          <p>Name:</p>
          <p>Phone Number:</p>
          <p>Address:</p>
          <p>Email:</p>
          <p>Additional Patients:</p>
        </div>
      </div>
    </div>
  );
};
