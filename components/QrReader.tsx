import React, { useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { Scanner } from '@yudiel/react-qr-scanner';
import { Button } from './ui/button';

interface QrReaderProps {
  onScan: (data: any) => void;
  onCancel: () => void;
}

const QrReader: React.FC<QrReaderProps> = ({ onScan, onCancel }) => {
  const qrReaderRef = useRef<HTMLDivElement | null>(null);

  const handleScan = (data: any) => {
    if (data && data[0].rawValue.length > 0) {
      onScan(data[0].rawValue);
    }
  };

  const handleCancel = () => {
    if (qrReaderRef.current) {
      const root = createRoot(qrReaderRef.current);
      root.unmount();
    }
    onCancel();
  };

  return (
    <div className='flex flex-col justify-center w-full'>
      <div ref={qrReaderRef}></div>
      <Scanner
        components={{ audio: false }}
        constraints={{ facingMode: 'exact' }}
        scanDelay={30}
        onScan={handleScan}
      />
      <Button className='mx-auto' onClick={handleCancel}>
        Cancel
      </Button>
    </div>
  );
};

export default QrReader;
