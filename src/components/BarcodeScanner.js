import React, { useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

const BarcodeScanner = ({
  onResult = () => {},
  onError = () => {},
}) => {
  const readerRef = useRef(null);
  const memoizedResultHandler = useRef(onResult);
  const memoizedErrorHandler = useRef(onError);

  // Function to determine the qrBox size
  const getQrBoxSize = () => {
    const width = window.innerWidth;
    // Set the size of the qrBox based on the screen width
    if (width < 600) {
        return 180;
    } else {
        return 250; 
    }
  };

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
        { fps: 30, qrbox: getQrBoxSize(), useBarCodeDetectorIfSupported: true },
        (_, { result }) => {
          memoizedResultHandler.current(result);
        },
        (_, error) => {
          memoizedErrorHandler.current(error);
        }
      );

    return () => {
      // Cleanup the Scanner on unmount, have to wait with a Timeout here since
      // Html5Qrcode starts a video.play() but does not include it in the Promise chain of start()
      didStart.then(() => setTimeout(() => {
        if (html5QrcodeScanner.isScanning) { 
          html5QrcodeScanner.stop();
        }
      }, 100));
    };
  }, [readerRef, memoizedResultHandler, memoizedErrorHandler]);

  return (
    <div
      id="reader"
      ref={readerRef}
      style={{ maxWidth: '500px', margin: '0 auto' }}
    />
  );
};

export default BarcodeScanner;