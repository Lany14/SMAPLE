import { Spinner } from "@nextui-org/react";

interface FormLoadingProps {
  message?: string;
}

export const FormLoading = ({ message }: FormLoadingProps) => {
  if (!message) return null;
  return (
    <div className="flex items-center gap-x-2 rounded-md bg-slate-200 p-3 text-sm text-primary">
      <Spinner size="sm" />
      <span>{message}</span>
    </div>
  );
};
