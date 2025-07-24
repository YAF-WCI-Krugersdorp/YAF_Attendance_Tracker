'use client';
import QRCode from 'react-qr-code';

export default function QRGenerator() {
  return (
    <QRCode 
      value={`${window.location.origin}/public/form`}
      size={256}
      bgColor="#ffffff"
      fgColor="#000000"
      level="L"
    />
  );
}