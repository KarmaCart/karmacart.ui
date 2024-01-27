import React, { useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

const BarcodeScanner = ({
  onResult = () => {},
  onError = () => {},
}) => {
  const readerRef = useRef(null);
  const memoizedResultHandler = useRef(onResult);
  const memoizedErrorHandler = useRef(onError);

  useEffect(() => {
    memoizedResultHandler.current = onResult;
  }, [onResult]);

  useEffect(() => {
    memoizedErrorHandler.current = onError;
  }, [onError]);

  useEffect(() => {
    if (!readerRef.current) return;

    // Initialize the Scanner
    const html5QrcodeScanner = new Html5Qrcode(readerRef.current.id);
    const didStart = html5QrcodeScanner
      .start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: 200 },
        (_, { result }) => {
          memoizedResultHandler.current(result);
        },
        (_, error) => {
          memoizedErrorHandler.current(error);
        }
      )
      .then(() => true);

    return () => {
      // Cleanup the Scanner on unmount
      didStart
        .then(() => html5QrcodeScanner.stop())
        .catch(() => {
          console.log('Error stopping scanner');
        });
    };
  }, [readerRef, memoizedResultHandler, memoizedErrorHandler]);

  return (
    <div
      id="reader"
      ref={readerRef}
    />
  );
};

export default BarcodeScanner;