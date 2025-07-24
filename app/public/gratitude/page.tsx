import Link from "next/link";

export default function GratitudePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6">
      <h1 className="text-2xl font-bold text-green-700">Thank You!</h1>
      <p className="text-lg text-center max-w-md">
        Your attendance has been recorded successfully. We appreciate your participation!
      </p>
      <Link
        href="/"
        className="rounded-full border border-solid border-green-500 transition-colors flex items-center justify-center bg-green-600 text-white gap-2 hover:bg-green-700 font-medium text-base h-12 px-5"
      >
        Back to Public Home
      </Link>
    </div>
  );
}