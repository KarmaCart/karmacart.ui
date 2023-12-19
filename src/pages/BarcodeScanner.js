import React, { useEffect } from 'react';
import Quagga from 'quagga';

const BarcodeScanner = () => {
  useEffect(() => {
    Quagga.init({
      inputStream : {
        name : "Live",
        type : "LiveStream",
        target: document.querySelector('#scanner-container')    // Or a reference to a DOM element
      },
      decoder : {
        readers : [
          // "code_128_reader",
          // "ean_reader",
          // "ean_8_reader",
          // "code_39_reader",
          // "code_39_vin_reader",
          // "codabar_reader",
          "upc_reader"
          // "upc_e_reader",
          // "i2of5_reader",
          // "2of5_reader",
          // "code_93_reader"
        ] // You can add more readers based on your requirement
      }
    }, function(err) {
        if (err) {
            console.log(err);
            return
        }
        console.log("Initialization finished. Ready to start");
        Quagga.start();
    });

    Quagga.onDetected((data) => {
      console.log("result", data.codeResult.code);
      // Handle the decoded barcode data here
    });

    return () => {
      Quagga.offDetected(); // Cleanup after unmounting
      Quagga.stop();        // Stop Quagga when component unmounts
    };
  }, []);

  return <div id="scanner-container" />;
};

export default BarcodeScanner;