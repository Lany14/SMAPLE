import React from "react";
import { Toaster } from "react-hot-toast";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      {children}
    </div>
  );
}
