import React, { useEffect } from 'react';
import { Layout, theme, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { HOME_PAGE } from '../App';

const { Content } = Layout;

const titleStyle = {
  fontSize: '48px', // Large font size
  fontWeight: 'bold', // Bold font weight
  color: '#215D31', // Green color for the text
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.25)', // Optional shadow for depth
  paddingBottom: '20px', // Padding around the text
  textAlign: 'center', // Center the text
  maxWidth: '600px', // Max width to keep the title size manageable
  margin: '0 auto', // Center the title block in the parent element
};

const HomePage = ({setSelectedMenuKey}) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  let navigate = useNavigate();

  useEffect(() => {
    setSelectedMenuKey(HOME_PAGE);
  }, [setSelectedMenuKey]);

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
    <img src='/karmacart-logo-title.png' alt="logo-title" width={250} height={250} />
    <div style={titleStyle}>KarmaCart</div>
    <h2 style={{margin: '0'}}>Scan & Discover:</h2>
    <p style={{fontSize: '16px', margin: '0', maxWidth: '400px', marginLeft: 'auto', marginRight: 'auto'}}>
      KarmaCart aims to be a comprehensive tool for consumers to navigate the ethical and sustainability of products, empowering them to make informed and impactful choices.
    </p>
    <Button type="primary" size="large" style={{margin: '10px'}} onClick={() => {navigate('/scan');}}>Scan First Item</Button>
  </Content>
  );
};

export default HomePage;