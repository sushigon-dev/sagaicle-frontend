import LoginForm from "@/components/auth/form/LoginForm";

function Page() {
  return (
    <div className="flex flex-col gap-2 items-center m-4 px-2 py-4 bg-white rounded-lg">
      <h1 className="text-xl text text-gray-800">ログイン</h1>
      <LoginForm registerLink="/auth/signup" />
    </div>
  );
}

export default Page;
