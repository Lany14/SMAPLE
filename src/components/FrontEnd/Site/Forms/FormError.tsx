import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { X } from "lucide-react";
import { useState } from "react";

interface FormErrorProps {
  message?: string;
  onClose?: () => void;
}

export const FormError = ({ message, onClose }: FormErrorProps) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!message || !isVisible) return null;

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  return (
    <div className="flex items-center gap-x-2 rounded-md bg-red-200 p-3 text-sm text-danger-600">
      <div className="flex items-center gap-x-2 ">
        <ExclamationTriangleIcon className="h-4 w-4" />
        <span>{message}</span>
      </div>
      <button
        onClick={handleClose}
        className="ml-auto  hover:opacity-70"
        aria-label="Close"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};
