import React, { useState } from 'react';
import { useZxing } from 'react-zxing';
import { BarcodeFormat, DecodeHintType } from '@zxing/library';
import './barcode.css';

const BarcodeScanner = ({ onScan }) => {
  const [result, setResult] = useState('');
  const [error, setError] = useState(null);

  const hints = new Map();
  hints.set(DecodeHintType.POSSIBLE_FORMATS, [BarcodeFormat.EAN_13, BarcodeFormat.EAN_8, BarcodeFormat.UPC_EAN_EXTENSION], BarcodeFormat.UPC_A);

  const { ref } = useZxing({
    hints,
    onResult(result) {
      setResult(result.getText());
      onScan(result.getText());
    },
    onError: (error) => setError(error.message)
  });

  return (
    <div>
      <video ref={ref} />
      {error && <p>Error: {error}</p>}
      <p>Scanned Result: {result}</p>
    </div>
  );
};

export default BarcodeScanner;