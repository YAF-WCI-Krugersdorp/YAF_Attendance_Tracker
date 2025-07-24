// firestore.js
import { db } from './firebase';
import { collection, addDoc, query, where, getDocs, orderBy } from 'firebase/firestore';

// Add attendance record (matches Flask's insert_attendance)
export const addAttendance = async (data) => {
  await addDoc(collection(db, 'attendance'), {
    ...data,
    timestamp: new Date().toISOString()
  });
};

// Get filtered records (matches Flask's get_filtered_attendance)
export const getAttendance = async (filters = {}) => {
  let q = query(collection(db, 'attendance'), orderBy('timestamp', 'desc'));
  
  if (filters.name) {
    q = query(q, where('name', '>=', filters.name), 
                 where('name', '<=', filters.name + '\uf8ff'));
  }
  if (filters.status) {
    q = query(q, where('status', '==', filters.status));
  }
  if (filters.date) {
    const date = new Date(filters.date);
    const nextDay = new Date(date);
    nextDay.setDate(date.getDate() + 1);
    
    q = query(q, where('timestamp', '>=', date.toISOString()),
                 where('timestamp', '<', nextDay.toISOString()));
  }

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};