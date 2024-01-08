import React from 'react';
import { Layout, theme, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;

const HomePage = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  let navigate = useNavigate();

  return(
  <Content
    style={{
      margin: '24px 16px',
      padding: 24,
      minHeight: 280,
      background: colorBgContainer,
      borderRadius: borderRadiusLG,
      textAlign: 'center'
    }}
  >
    <img src='/karmacart-logo-title.png' alt="logo-title" width={200} height={250} />
    <h2 style={{margin: '0'}}>Scan & Discover:</h2>
    <p style={{fontSize: '15px', margin: '0', maxWidth: '500px', marginLeft: 'auto', marginRight: 'auto'}}>
      KarmaCart aims to be a comprehensive tool for consumers to navigate the ethical and sustainability of products, empowering them to make informed and impactful choices.
    </p>
    <Button type="primary" size="large" style={{margin: '10px'}} onClick={() => {navigate('/scan')}}>Scan First Item</Button>
  </Content>
  );
};

export default HomePage;