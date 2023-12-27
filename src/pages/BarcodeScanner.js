import React, { useEffect, useState } from 'react';
import Quagga from 'quagga';
import { Layout, theme } from 'antd';

const { Content } = Layout;

let wasLoadingDialogHidden = false;

const BarcodeScanner = () => {

  const [isLoadingDialogVisible, setLoadingDialogVisible] = useState(false);

  const showLoadingDialog = () => {
    if(!wasLoadingDialogHidden) {
      setLoadingDialogVisible(true);  
    }
  };

  const hideLoadingDialog = () => {
    setLoadingDialogVisible(false);
    wasLoadingDialogHidden = true;
  };

  useEffect(() => {

    setTimeout(() => {
      showLoadingDialog();
    }, 400);

    Quagga.init({
      locate: true,
      inputStream : {
        name : "Live",
        type : "LiveStream",
        target: document.querySelector('#scanner-container'),
        constraints: {
          width: 300,
          height: 300,
          facingMode: "environment"
        },
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
        hideLoadingDialog();
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

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Content
    style={{
      margin: '24px 16px',
      padding: 24,
      minHeight: 280,
      background: colorBgContainer,
      borderRadius: borderRadiusLG,
      alignItems: 'center',
    }}
    >
    <div style={{fontSize: '20px'}}>Scan</div>
    <div style={{textAlign: 'center', fontSize: '20px', display: isLoadingDialogVisible ? 'block' : 'none'}}>Loading...</div>
    <div id="scanner-container">
    </div>
  </Content>
  );
};

export default BarcodeScanner;