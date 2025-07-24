import { getAttendance } from '@/firestore';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const filters = {
    name: searchParams.get('name'),
    status: searchParams.get('status'),
    date: searchParams.get('date'),
    gender: searchParams.get('gender'),
  };
  
  const records = await getAttendance(filters);
  return NextResponse.json(records);
}