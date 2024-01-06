import React from 'react';
import { Layout, theme } from 'antd';
import { useLocation } from 'react-router-dom';

const { Content } = Layout;

const ItemPage = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const location = useLocation();

  console.log(`Rendering ItemPage with barcode: ${JSON.stringify(location.state.barcode)}`)

  return(
  <Content
    style={{
      margin: '24px 16px',
      padding: 24,
      minHeight: 280,
      background: colorBgContainer,
      borderRadius: borderRadiusLG,
    }}
  >
    <p>Item Page</p>
    <p>Barcode: {location.state.barcode.decodedText}</p>
  </Content>
  );
};

export default ItemPage