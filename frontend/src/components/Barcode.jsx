import { BrowserMultiFormatReader } from '@zxing/library';
import { useEffect, useMemo, useRef, useState } from 'react';
import './barcode.css';

const useZxing = ({
  constraints = {
    audio: false,
    video: {
      facingMode: 'environment',
    },
  },
  hints,
  timeBetweenDecodingAttempts = 300,
  onResult = () => {},
  onError = () => {},
} = {}) => {
  const ref = useRef(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const reader = useMemo(() => {
    const instance = new BrowserMultiFormatReader(hints);
    instance.timeBetweenDecodingAttempts = timeBetweenDecodingAttempts;
    return instance;
  }, [hints, timeBetweenDecodingAttempts]);

  useEffect(() => {
    if (!ref.current) return;
    reader.decodeFromConstraints(constraints, ref.current, (result, err) => {
      if (result) {
        setResult(result);
        onResult(result);
      }
      if (err) {
        setError(err);
        onError(err);
      }
    });
    return () => {
      reader.reset();
    };
  }, [ref, reader]);

  return { ref, result, error };
};

const Barcode = ({
  onResult = () => {},
  onError = () => {},
}) => {
  const { ref, result, error } = useZxing({ onResult, onError });
  return (
  <>
    <video ref={ref} className="barcode-video" />
    {result && <p>Result: {result.text}</p>}
    {error && <p>Error: {error.message}</p>}
  </>
  );
};

export default Barcode;