"use client";

import { useEffect } from "react";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const router = useRouter();

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h2 className="mb-4 text-2xl font-bold">Something went wrong!</h2>
      <div className="flex gap-4">
        <Button onClick={() => reset()}>Try again</Button>
        <Button onClick={() => router.push("/dashboard")}>
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
}
