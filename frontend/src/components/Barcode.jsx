import { BrowserMultiFormatReader, DecodeHintType, BarcodeFormat } from '@zxing/library';
import { useEffect, useMemo, useRef, useState } from 'react';
import './barcode.css';

const useZxing = ({
  constraints = {
    audio: false,
    video: {
      facingMode: 'environment',
    },
  },
  timeBetweenDecodingAttempts = 300,
  onResult = () => {},
  onError = () => {},
} = {}) => {
  const ref = useRef(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const hints = useMemo(() => {
    const hintsMap = new Map();
    hintsMap.set(DecodeHintType.POSSIBLE_FORMATS, [BarcodeFormat.EAN_13, BarcodeFormat.EAN_8, BarcodeFormat.UPC_EAN_EXTENSION, BarcodeFormat.UPC_A]);
    hintsMap.set(DecodeHintType.TRY_HARDER, true);
    return hintsMap;
  }, []);

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
    <video ref={ref} />
    {result && <p>Result: {result.text}</p>}
    {error && <p>Error: {error.message}</p>}
  </>
  );
};

export default Barcode;