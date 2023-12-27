import React from 'react';
import { Layout, theme } from 'antd';
import BarcodeScanner from '../components/BarcodeScanner';

const { Content } = Layout;

const Scan = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

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
    <BarcodeScanner />
  </Content>
  );
};

export default Scan