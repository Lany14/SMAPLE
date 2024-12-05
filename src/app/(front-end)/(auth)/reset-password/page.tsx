// import ResetPasswordForm from "@/src/components/FrontEnd/Site/Forms/ResetPasswordForm";
import ResetPasswordForm from "@/components/FrontEnd/Site/Forms/ResetPasswordForm";
import AuthLayout from "@/components/FrontEnd/Site/Layout/AuthLayout";
export default function Register() {
  return (
    <AuthLayout>
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <div className="w-full rounded-lg bg-white shadow-2xl dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
              Reset Password
            </h1>
            <ResetPasswordForm />
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
