'use client';
import { addAttendance } from '@/firestore';
import { useRouter } from 'next/navigation';
import { useState,FormEvent } from 'react';


export default function AttendanceForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;

    try {
      const result = await addAttendance({
        name: formData.get('name') as string,
        surname: formData.get('surname') as string,
        gender: formData.get('gender') as string,
        phone: formData.get('phone') as string,
        status: formData.get('status') as string
      });

      // Both methods for redundancy
      router.push(`/public/gratitude?name=${encodeURIComponent(name)}`);
      window.location.href = `/public/gratitude?name=${encodeURIComponent(name)}`;
      
    } catch (err: unknown) {
      let errorMessage = 'Submission failed. Please try again.';
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      setError(errorMessage);
      console.error('Submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-white via-gray-100 to-red-100 dark:from-black dark:via-gray-900 dark:to-red-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-black rounded-xl shadow-lg p-8 w-full max-w-md flex flex-col gap-6 border border-red-200 dark:border-red-700"
      >
        <h2 className="text-2xl font-bold text-center text-red-700 dark:text-red-400 mb-2">Attendance Form</h2>
        <input
          name="name"
          placeholder="First Name"
          required
          className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-red-400"
        />
        <input
          name="surname"
          placeholder="Last Name"
          required
          className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-red-400"
        />
        <select
          name="gender"
          defaultValue=""
          required
          className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          <option value="" disabled>
            Select Gender
          </option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input
          name="phone"
          placeholder="Phone"
          type="tel"
          required
          className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-red-400"
        />
        <select
          name="status"
          defaultValue=""
          required
          className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          <option value="" disabled>
            Select Status
          </option>
          <option value="First-Timer">First-Timer</option>
          <option value="Regular">Regular</option>
        </select>
       {error && (
          <div className="text-red-600 mb-4">
            {error} - Please try again or contact support
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`mt-2 py-2 rounded bg-red-600 text-white font-semibold ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-700'
          }`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}