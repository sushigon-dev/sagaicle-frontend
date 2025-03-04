import { RegisterForm } from "@/components/auth";

function Page() {
  return (
    <div className="flex flex-col gap-2 items-center m-4 px-2 py-4 bg-white rounded-lg">
      <h1 className="text-xl text text-gray-800">アカウントを作成する</h1>
      <RegisterForm loginLink="/auth/login" />
    </div>
  );
}

export default Page;
