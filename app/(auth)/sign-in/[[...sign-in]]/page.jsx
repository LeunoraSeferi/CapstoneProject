import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen w-screen">
      <SignIn />
    </div>
  );
}
//className="text-2xl font-semibold text-center text-white-700 mt-10"