import React, { useRef, useEffect, useState } from 'react';
import { BrowserMultiFormatReader } from '@zxing/library';

export default function Barcode() {
  const videoRef = useRef(null);
  const reader = useRef(new BrowserMultiFormatReader());
  const [result, setResult] = useState("null"); 

  useEffect(() => {
    if (!videoRef.current) return;
    reader.current.decodeFromConstraints(
      {
        audio: false,
        video: {
          facingMode: 'environment',
        },
      },
      videoRef.current,
      (result, error) => {
        if (result) {
          console.log(result);
          setResult(result.text);
        }
        if (error) console.log(error);
      }
    );
    return () => {
      reader.current.reset();
    };
  }, [videoRef]);

  return (
    <>
      <video ref={videoRef} />
      <p>{result}</p> 
    </>
  );
}