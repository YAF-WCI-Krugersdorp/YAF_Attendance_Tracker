'use client';
import { addAttendance } from '@/firestore';
import { useRouter } from 'next/navigation';

export default function AttendanceForm() {
  const router = useRouter();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    await addAttendance({
      name: formData.get('name') as string,
      surname: formData.get('surname') as string,
      gender: formData.get('gender') as string,
      phone: formData.get('phone') as string,
      status: formData.get('status') as string
    });
    
    router.push(`/public/gratitude?name=${encodeURIComponent(formData.get('name') as string)}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="First Name" required />
      <input name="surname" placeholder="Last Name" required />
      <select name="gender" defaultValue="" required>
        <option value="" disabled>
          Select Gender
        </option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <input name="phone" placeholder="Phone" type="tel" required />
      <select name="status" defaultValue="" required>
        <option value="" disabled>
          Select Status
        </option>
        <option value="first-timer">First-timer</option>
        <option value="regular">Regular</option>
      </select>
      <button type="submit">Submit</button>
    </form>
  );
}