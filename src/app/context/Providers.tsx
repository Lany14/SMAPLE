import React from "react";
import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div>
      {isClient && <Toaster position="top-right" reverseOrder={false} />}
      {children}
    </div>
  );
}
