"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ShowPassStrength from "./ShowPassStrength";
import { passwordStrength } from "check-password-strength";
import { EyeFilledIcon } from "../../../../../public/images/icon/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../../../../../public/images/icon/EyeSlashFilledIcon";
import { ResetPasswordInputProps } from "@/types/credInputs";

const FormSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(50, "Password must be less than 50 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type Strength = 0 | 1 | 2 | 3;

const calculateStrength = (password: string): number => {
  return passwordStrength(password).id;
};

export default function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pwResetToken = searchParams.get("token");
  const [loading, setLoading] = useState(false);
  const [pass, setPass] = useState<string>("");
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ResetPasswordInputProps>({
    resolver: zodResolver(FormSchema),
  });

  const passwordToggleVisibility = () =>
    setPasswordIsVisible(!passwordIsVisible);

  async function onSubmit(data: ResetPasswordInputProps) {
    console.log("URL Params:", Object.fromEntries(searchParams.entries()));
    console.log("Reset Token:", pwResetToken);

    if (!pwResetToken) {
      toast.error("Invalid or missing reset token");
      return;
    }

    const payload = {
      password: data.password,
      pwResetToken: pwResetToken,
    };

    console.log("Sending payload:", payload);

    try {
      setLoading(true);
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      console.log("API Response:", result);

      if (response.ok) {
        toast.success("Password reset successful");
        reset();
        router.push("/sign-in");
      } else {
        toast.error(result.error || "Failed to reset password");
      }
    } catch (error) {
      console.error("Reset password error:", error);
      toast.error("Something went wrong while resetting your password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          New Password
        </label>
        <div className="relative">
          <span
            className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
            onClick={passwordToggleVisibility}
            role="button"
            aria-label="toggle password visibility"
          >
            {passwordIsVisible ? (
              <EyeSlashFilledIcon className="pointer-events-none text-2xl text-default-400" />
            ) : (
              <EyeFilledIcon className="pointer-events-none text-2xl text-default-400" />
            )}
          </span>
          <input
            {...register("password")}
            type={passwordIsVisible ? "text" : "password"}
            onChange={(e) => setPass(e.target.value)}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
            placeholder="••••••••"
          />
        </div>
        {errors.password && (
          <small className="text-sm text-red-600">
            {errors.password.message}
          </small>
        )}
        <ShowPassStrength strength={calculateStrength(pass) as Strength} />
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Confirm Password
        </label>
        <input
          {...register("confirmPassword")}
          type="password"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
          placeholder="••••••••"
        />
        {errors.confirmPassword && (
          <small className="text-sm text-red-600">
            {errors.confirmPassword.message}
          </small>
        )}
      </div>

      {loading ? (
        <button
          disabled
          type="button"
          className="inline-flex w-full items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white"
        >
          <svg
            aria-hidden="true"
            role="status"
            className="mr-3 inline h-4 w-4 animate-spin text-white"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="#E5E7EB"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentColor"
            />
          </svg>
          Resetting password...
        </button>
      ) : (
        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          Reset Password
        </button>
      )}
    </form>
  );
}
