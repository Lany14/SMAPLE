"use client";
import React, { useEffect } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";
import { EyeFilledIcon } from "../../../../../public/images/icon/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../../../../../public/images/icon/EyeSlashFilledIcon";
import ShowPassStrength from "./ShowPassStrength";
import { passwordStrength } from "check-password-strength";
import { SignupInputProps } from "@/types/credInputs";
import { z } from "zod";
import createUser from "../../../../../actions/user";
import { userAgent } from "next/server";
import { UserRole } from "@prisma/client";
import validator from "validator";
import { zodResolver } from "@hookform/resolvers/zod";

type Strength = 0 | 1 | 2 | 3;

const FormSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "First name must be at least 2 characters")
      .max(45, "First name must be less than 45 characters")
      .regex(new RegExp("^[a-zA-Z]+$"), "No special character allowed!"),
    lastName: z
      .string()
      .min(2, "Last name must be at least 2 characters")
      .max(45, "Last name must be less than 45 characters")
      .regex(new RegExp("^[a-zA-Z]+$"), "No special character allowed!"),
    email: z.string().email("Please enter a valid email address"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters ")
      .max(50, "Password must be less than 50 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters ")
      .max(50, "Password must be less than 50 characters"),
    // accepted: z.literal(true, {
    //   errorMap: () => ({
    //     message: "Please accept all terms",
    //   }),
    // }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password and confirm password doesn't match!",
    path: ["confirmPassword"],
  });

export default function RegisterForm({
  role = "PET_OWNER",
}: {
  role?: UserRole;
}) {
  const [loading, setLoading] = useState(false);
  const [emailErr, setEmailErr] = useState("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<SignupInputProps>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: SignupInputProps) {
    console.log(data);
    setLoading(true);
    await createUser(data);

    data.role = role;
    try {
      const user = await createUser(data);
      if (user && user.status === 200) {
        console.log("User Created Successfully");
        reset();
        setLoading(false);
        console.log(user.data);
      } else {
        console.log(user.error);
      }
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  }

  // async function onSubmit(data) {
  //   try {
  //     console.log(data);
  //     setLoading(true);
  //     const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  //     const response = await fetch(`${baseUrl}/api/user`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     });

  //     const responseData = await response.json();

  //     if (response.ok) {
  //       setLoading(false);
  //       toast.success("User Created Successfully");
  //       reset();
  //       router.push("/login");
  //     } else {
  //       setLoading(false);
  //       if (response.status === 409) {
  //         setEmailErr("User with this Email already exists");
  //         toast.error("User with this Email already exists");
  //       } else {
  //         // Handle other errors
  //         console.error("Server Error:", responseData.message);
  //         toast.error("Oops Something Went wrong");
  //       }
  //     }
  //   } catch (error) {
  //     setLoading(false);
  //     console.error("Network Error:", error);
  //     toast.error("Something Went wrong, Please Try Again");
  //   }
  // }

  // Password Visibility state

  const [passwordIsVisible, passwordSetIsVisible] = React.useState(false);
  const passwordToggleVisibility = () => passwordSetIsVisible((prev) => !prev);

  // Password Strength state
  const [strength, setStrength] = useState(0);
  const [pass, setPass] = useState<string>("");
  useEffect(() => {
    setStrength(passwordStrength(pass).id as Strength);
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label
            htmlFor="firstName"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            First name
          </label>
          <input
            {...register("firstName", { required: true })}
            type="text"
            name="firstName"
            id="firstName"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
            placeholder="Juan"
          />
          {/* {errors.firstName && (
            <small className="text-sm text-red-600 ">
              This field is required
            </small>
          )} */}
          {errors.firstName?.message && (
            <p className="pt-2 text-xs text-red-600">
              {errors.firstName.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="lastName"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Last name
          </label>
          <input
            {...register("lastName", { required: true })}
            type="text"
            name="lastName"
            id="lastName"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
            placeholder="Dela Cruz"
          />
          {/* {errors.lastName && (
            <small className="text-sm text-red-600 ">
              This field is required
            </small>
          )} */}
          {errors.lastName?.message && (
            <p className="pt-2 text-xs text-red-600">
              {errors.lastName.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Email Address
        </label>
        <input
          {...register("email", { required: true })}
          type="email"
          name="email"
          id="email"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
          placeholder="juandelacruz@email.com"
        />
        {/* {errors.email && (
          <small className="text-sm text-red-600 ">
            This field is required
          </small>
        )} */}
        {errors.email?.message && (
          <p className="pt-2 text-xs text-red-600">{errors.email.message}</p>
        )}
        <small className="text-sm text-red-600 ">{emailErr}</small>
      </div>
      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Password
        </label>
        <div className="relative">
          <span
            className="absolute right-4.5 top-1/2 -translate-y-1/2 focus:outline-none"
            role="button"
            onClick={passwordToggleVisibility}
            aria-label="toggle password visibility"
          >
            {passwordIsVisible ? (
              <EyeSlashFilledIcon className="pointer-events-none text-2xl text-default-400" />
            ) : (
              <EyeFilledIcon className="pointer-events-none text-2xl text-default-400" />
            )}
          </span>
          <input
            {...register("password", { required: true })}
            onChange={(e) => setPass(e.target.value)}
            type={passwordIsVisible ? "text" : "password"}
            name="password"
            id="password"
            placeholder="••••••••"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
          />
        </div>
        {errors.password?.message && (
          <p className="pt-2 text-xs text-red-600">{errors.password.message}</p>
        )}
        {/* <span className="text-sm font-light text-gray-500 dark:text-gray-400">
          Minimum of 8 characters in length
        </span> */}
        {/* {errors.password && (
          <small className="text-sm text-red-600 ">
            This field is required
          </small>
        )} */}
        <ShowPassStrength strength={strength as Strength} />
      </div>
      <div>
        <label
          htmlFor="confirmPassword"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Confirm Password
        </label>
        <div className="relative">
          <input
            {...register("confirmPassword")}
            type={passwordIsVisible ? "text" : "password"}
            placeholder="••••••••"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
          />
        </div>
        {errors.confirmPassword?.message && (
          <p className="pt-2 text-xs text-red-600">
            {errors.confirmPassword.message}
          </p>
        )}
        {/* {errors.confirmPassword && (
          <small className="text-sm text-red-600 ">
            This field is required
          </small>
        )} */}
      </div>
      {/* <label
        htmlFor="remember"
        className="font-mediumx flex cursor-pointer select-none items-center  text-sm text-dark dark:text-white"
      >
        <input
          {...register("terms")}
          type="checkbox"
          name="remember"
          id="remember"
          className="peer sr-only"
        />
        <span
          className={`mr-2.5 inline-flex h-5.5 w-5.5 items-center justify-center rounded-md border border-stroke bg-white text-white text-opacity-0 peer-checked:border-primary peer-checked:bg-primary peer-checked:text-opacity-100 dark:border-stroke-dark dark:bg-white/5 ${
            data.remember ? "bg-primary" : ""
          }`}
        >
          <svg
            width="10"
            height="7"
            viewBox="0 0 10 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.70692 0.292787C9.89439 0.480314 9.99971 0.734622 9.99971 0.999786C9.99971 1.26495 9.89439 1.51926 9.70692 1.70679L4.70692 6.70679C4.51939 6.89426 4.26508 6.99957 3.99992 6.99957C3.73475 6.99957 3.48045 6.89426 3.29292 6.70679L0.292919 3.70679C0.110761 3.51818 0.00996641 3.26558 0.0122448 3.00339C0.0145233 2.74119 0.119692 2.49038 0.3051 2.30497C0.490508 2.11956 0.741321 2.01439 1.00352 2.01211C1.26571 2.00983 1.51832 2.11063 1.70692 2.29279L3.99992 4.58579L8.29292 0.292787C8.48045 0.105316 8.73475 0 8.99992 0C9.26508 0 9.51939 0.105316 9.70692 0.292787Z"
              fill="currentColor"
            />
          </svg>
        </span>
        I accept the &nbsp;
        <Link href="/term-condition" className="font-bold">
          Terms and Conditions
        </Link>
      </label> */}
      {loading ? (
        <button
          disabled
          type="button"
          className="mr-2 inline-flex w-full justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
          Creating please wait...
        </button>
      ) : (
        <button
          type="submit"
          className="w-full rounded-lg bg-primary px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primaryho focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Create Account
        </button>
      )}
      <div className="flex items-center ">
        <div className="h-[1px] w-full bg-slate-500"></div>
        <span className="mx-2">or</span>
        <div className="h-[1px] w-full bg-slate-500"></div>
      </div>
      <div className="">
        <button
          type="button"
          onClick={() => signIn("google")}
          className="mb-4 me-2 flex w-full items-center justify-center rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-center text-sm font-medium text-slate-950 hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-100 dark:focus:ring-slate-100"
        >
          <FaGoogle className="mr-2 h-4 w-4" />
          Sign up with Google
        </button>
      </div>
      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        Already have an account?{" "}
        <Link
          href="/signin"
          className="font-medium text-blue-600 hover:underline dark:text-blue-500"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}
