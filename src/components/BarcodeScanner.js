import React, { useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

const BarcodeScanner = () => {
  const scannerRef = useRef(null);

  const onScanSuccess = (decodedText, decodedResult) => {
    // Handle the scanned code as required.
    console.log(`Code matched = ${decodedText}`, decodedResult);
    // To stop scanning after first scan.
    scannerRef.current.stop();
  };

  const onScanFailure = (error) => {
    // handle scan failure, usually better to ignore and keep scanning.
  };

  useEffect(() => {

    console.log('use effect')
    if (!scannerRef.current) {
      const html5QrcodeScanner = new Html5QrcodeScanner(
        "qr-reader",
        { fps: 10, qrbox: 200 },
        /* verbose= */ false
      );
      html5QrcodeScanner.render(onScanSuccess, onScanFailure);

      scannerRef.current = html5QrcodeScanner
    } 

    // Cleanup 
    return () => {
    };
  }, []);

  return <div id="qr-reader"/>;
};

export default BarcodeScanner;