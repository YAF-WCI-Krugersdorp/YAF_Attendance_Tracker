// firestore.js
import { db } from './firebase';
import { collection, addDoc, query, where, getDocs, orderBy } from 'firebase/firestore';

export const addAttendance = async (data) => {
  try {
    const docRef = await addDoc(collection(db, 'attendance'), {
      ...data,
      timestamp: new Date().toISOString()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding document: ", error);
    throw new Error("Failed to submit attendance");
  }
};


export const getAttendance = async (filters = {}) => {
  try {
    let q = query(collection(db, 'attendance'), orderBy('timestamp', 'desc'));
    
    if (filters.name) {
      q = query(q, where('name', '>=', filters.name), 
                  where('name', '<=', filters.name + '\uf8ff'));
    }
    if (filters.status) {
      q = query(q, where('status', '==', filters.status));
    }
    if (filters.gender) {
      q = query(q, where('gender', '==', filters.gender));
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
    } catch (error) {
      console.error("Error getting documents: ", error);
      throw new Error("Failed to fetch attendance records");
    }
};