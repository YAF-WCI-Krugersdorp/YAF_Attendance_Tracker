// app/components/QRTest.tsx
'use client';
import QRCode from 'react-qr-code';

export default function QRTest() {
  return <QRCode value="https://your-site.com" size={128} />;
}