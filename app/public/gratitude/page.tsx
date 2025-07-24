'use client';
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function GratitudePage() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6">
      <h1 className="text-2xl font-bold text-grey-700">Thank You {name ? name : "!"}</h1>
      <p className="text-lg text-center max-w-md">
        Your attendance has been recorded successfully. Thank you for gracing us with your presence!
      </p>
      <Link
        href="/"
        className="rounded-full border border-solid border-red-500 transition-colors flex items-center justify-center bg-red-600 text-white gap-2 hover:bg-red-700 font-medium text-base h-12 px-5"
      >
        Back to Public Home
      </Link>
    </div>
  );
}