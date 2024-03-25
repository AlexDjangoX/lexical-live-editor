import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="flex h-screen justify-center items-center align-middle">
      <SignUp path="/sign-in" />
    </div>
  );
}
