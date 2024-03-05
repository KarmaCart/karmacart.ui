import React, { useEffect, useState } from 'react';
import { Layout, theme, Button, Modal } from 'antd';
import BarcodeScanner from '../components/BarcodeScanner';
import { useNavigate } from 'react-router-dom';
import { SCAN_PAGE } from '../App';

const { Content } = Layout;

const ScanPage = ({setSelectedMenuKey}) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  let navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Function to determine the qrBox size
  const getQrBoxSize = () => {
    const width = window.innerWidth;
    // Set the size of the qrBox based on the screen width
    if (width < 600) {
        return "310px";
    } else {
        return "500px"; 
    }
  };

  useEffect(() => {
    setSelectedMenuKey(SCAN_PAGE);
  }, [setSelectedMenuKey]);

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
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: getQrBoxSize() }}>
        <div style={{fontSize: '20px'}}>Barcode Scanner</div>
        <Button type="link" onClick={showModal}>What is this?</Button>
      </div>
    </div>
    <BarcodeScanner
                onResult={handleScanSuccess}
                onError={handleScanFailure}
            />
    <Modal
      title="About the Barcode Scanner"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Close
        </Button>,
      ]}
    >
      <p>The barcode scanner helps you quickly find information about products by scanning their barcodes. Simply point your device's camera at a barcode to get started.</p>
      <p>This tool can provide details such as company information, product information, and ethical ratings, helping you make informed purchasing decisions.</p>
      <p>For a list of all products visit the Products page from the menu.</p>
    </Modal>
  </Content>
  );
};

export default ScanPage