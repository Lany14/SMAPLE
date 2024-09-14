import ForgotPasswordForm from "@/components/Site/Forms/ForgotPasswordForm";
import SignUpForm from "@/components/Site/Forms/SignUpForm";

export default function Register() {
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <div className="dark:bg-gray-800 dark:border-gray-700 w-full rounded-lg bg-white shadow-2xl dark:border sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="text-gray-900 text-center text-xl font-bold leading-tight tracking-tight dark:text-white md:text-2xl">
              Reset Password
            </h1>
            <ForgotPasswordForm />
          </div>
        </div>
      </div>
    </section>
  );
}
