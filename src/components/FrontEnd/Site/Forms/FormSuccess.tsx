import { CheckCircleIcon, X } from "lucide-react";
import { useState } from "react";

interface FormSuccessProps {
  message?: string;
  onClose?: () => void;
}

export const FormSuccess = ({ message, onClose }: FormSuccessProps) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!message || !isVisible) return null;

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  return (
    <div className="flex items-center justify-between gap-x-2 rounded-md bg-green-200 p-3 text-sm  text-success-600">
      <div className="flex items-center gap-x-2 ">
        <CheckCircleIcon className="h-4 w-4" />
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
