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
      phone: formData.get('phone') as string,
      status: formData.get('status') as string
    });
    
    router.push(`/public/gratitude?name=${encodeURIComponent(formData.get('name') as string)}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="First Name" required />
      <input name="surname" placeholder="Last Name" required />
      <input name="phone" placeholder="Phone" type="tel" required />
      <select name="status" defaultValue="present">
        <option value="present">Present</option>
        <option value="absent">Absent</option>
      </select>
      <button type="submit">Submit</button>
    </form>
  );
}