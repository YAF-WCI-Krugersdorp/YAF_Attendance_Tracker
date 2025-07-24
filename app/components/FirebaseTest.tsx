// app/components/FirebaseTest.tsx
'use client';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export default function FirebaseTest() {
  const testFirebase = () => {
    const app = initializeApp({
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_PROJECT.firebaseapp.com",
      projectId: "YOUR_PROJECT_ID"
    });
    const db = getFirestore(app);
    console.log("Firestore instance:", db);
  };

  return <button onClick={testFirebase}>Test Firebase</button>;
}