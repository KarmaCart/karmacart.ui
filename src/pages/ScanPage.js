import React from 'react';
import { Layout, theme } from 'antd';
import BarcodeScanner from '../components/BarcodeScanner';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;

const ScanPage = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  let navigate = useNavigate();

  const handleScanSuccess = (decodedResult) => {
    // Navigate to the company page
    navigate('/company', { state: { barcode: decodedResult } });
  };

  const handleScanFailure = (error) => {
      // console.log(`Scan failure: ${error}`);
  };

  return(
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
    <div style={{ textAlign: 'center', fontSize: '20px'}}>Barcode Scanner</div>
    <BarcodeScanner
                onResult={handleScanSuccess}
                onError={handleScanFailure}
            />
  </Content>
  );
};

export default ScanPage