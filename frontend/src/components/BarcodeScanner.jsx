import React, { useState } from 'react';
import { useZxing } from 'react-zxing';
import { BarcodeFormat, DecodeHintType } from '@zxing/library';
import './barcode.css';

const BarcodeScanner = ({ onScan }) => {
  const [result, setResult] = useState('');

  const hints = new Map();
  hints.set(DecodeHintType.POSSIBLE_FORMATS, [BarcodeFormat.EAN_13, BarcodeFormat.EAN_8]);

  const { ref } = useZxing({
    hints,
    onResult(result) {
      setResult(result.getText());
      onScan(result.getText());
    },
  });

  return (
    <div>
      <video ref={ref} className='barcode-video' />
      <p>Scanned Result: {result}</p>
    </div>
  );
};

export default BarcodeScanner;
