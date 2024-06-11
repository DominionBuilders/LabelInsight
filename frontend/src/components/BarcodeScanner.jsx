import React, { useState, useEffect, useRef } from 'react';
import { useZxing } from 'react-zxing';
import { BarcodeFormat, DecodeHintType } from '@zxing/library';

const BarcodeScanner = ({ onScan }) => {
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [zoom, setZoom] = useState(1);
  const videoRef = useRef(null);

  const hints = new Map();
  hints.set(DecodeHintType.POSSIBLE_FORMATS, [BarcodeFormat.EAN_13, BarcodeFormat.EAN_8, BarcodeFormat.UPC_EAN_EXTENSION], BarcodeFormat.UPC_A);
  hints.set(DecodeHintType.TRY_HARDER, true);

  const { ref } = useZxing({
    hints,
    onResult(result) {
      setResult(result.getText());
      onScan(result.getText());
    },
    onError(error) {
      setError(error.message);
    },
  });

  useEffect(() => {
    const video = videoRef.current;

    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        video.srcObject = stream;
        video.play();

        const track = stream.getVideoTracks()[0];
        const capabilities = track.getCapabilities();

        if (capabilities.zoom) {
          // Set initial zoom level if available
          track.applyConstraints({ advanced: [{ zoom: zoom }] });
        } else {
          setError('Zoom is not supported by this camera.');
        }
      })
      .catch((err) => {
        setError(`Error accessing camera: ${err.message}`);
      });

    return () => {
      const stream = video.srcObject;
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [zoom]);

  useEffect(() => {
    if (error) {
      console.error("Barcode scanning error:", error);
    }
  }, [error]);

  return (
    <div>
      <video ref={videoRef} />
      <p>Scanned Result: {result}</p>
      {error && <p>Error: {error}</p>}
      <input
        type="range"
        min="1"
        max="10"
        step="0.1"
        value={zoom}
        onChange={(e) => setZoom(Number(e.target.value))}
        disabled={!!error}
      />
    </div>
  );
};

export default BarcodeScanner;
