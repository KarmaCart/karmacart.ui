import React, { useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useNavigate } from 'react-router-dom';

const BarcodeScanner = () => {
  const scannerRef = useRef(null);
  let navigate = useNavigate();

  const onScanSuccess = (decodedText, decodedResult) => {
    // Handle the scanned code as required.
    console.log(`Code matched = ${decodedText}`, decodedResult);
    // To stop scanning after first scan.
    scannerRef.current.clear();
    // Navigate to the company page
    navigate('/company', { state: { barcode: decodedResult } });
  };

  const onScanFailure = (error) => {
    // handle scan failure, usually better to ignore and keep scanning.
  };

  useEffect(() => {
    if (!scannerRef.current) {
      const html5QrcodeScanner = new Html5QrcodeScanner(
        "qr-reader",
        { fps: 10, qrbox: 200, facingMode: { exact: "environment"} },
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