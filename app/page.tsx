'use client';
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const { theme } = useTheme();
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          src={theme === "light" ? "/Winners_dark.png" : "/Winners_light.png"}
          alt="Winners Chapel Youth Aflame Logo"
          width={300}
          height={300}
          className="rounded-full"
        />
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Link
            href="/admin/dashboard"
            className="rounded-full border border-solid border-red-500 transition-colors flex items-center justify-center bg-red-600 text-white gap-2 hover:bg-red-700 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
          >
            Admin Dashboard
          </Link>
          <Link
            href="/public/form"
            className="rounded-full border border-solid border-red-500 transition-colors flex items-center justify-center bg-red-600 text-white gap-2 hover:bg-red-700 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
          >
            Public Attendance
          </Link>
        </div>
      </main>
    </div>
  );
}
