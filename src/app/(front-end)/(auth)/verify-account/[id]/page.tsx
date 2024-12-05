import VerifyTokenForm from "@/components/FrontEnd/Site/Forms/VerifyTokenForm";
import { getUserById } from "../../../../../../actions/user";
import AuthLayout from "@/components/FrontEnd/Site/Layout/AuthLayout";

interface PageProps {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function VerifyAccount(props: PageProps) {
  // Await the params before destructuring
  const params = await Promise.resolve(props.params);
  const id = params.id;

  const user = await getUserById(id);
  const userToken = user?.emailVerificationToken ?? undefined;

  return (
    <AuthLayout>
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
          <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
            Verify Account
          </h1>
          <p>
            <span className="font-medium">Please Check your Email!</span> We
            have sent you a verification code. Please enter the code here to
            verify your Account. Thank you!
          </p>
          <VerifyTokenForm userToken={userToken} id={id} />
        </div>
      </div>
    </AuthLayout>
  );
}
