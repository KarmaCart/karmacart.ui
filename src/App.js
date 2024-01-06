import React, { useState } from 'react';
import {
  InfoCircleOutlined,
  UserOutlined,
  ScanOutlined,
  MenuOutlined
} from '@ant-design/icons';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout, Menu, Button, Drawer, ConfigProvider } from 'antd';
import Scan from './pages/ScanPage';
import LoginPage from './pages/LoginPage';
import MoreInfoPage from './pages/MoreInfoPage';
const { Header, Footer } = Layout;

const App = () => {

  const [visible, setVisible] = useState(false);

  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }

  const LOGIN_PAGE = 'LOGIN_PAGE';
  const SCAN_PAGE = 'SCAN_PAGE';
  const MORE_INFO_PAGE = 'MORE_INFO_PAGE';
  
  const items = [
    getItem('Account', LOGIN_PAGE, <UserOutlined />),
    getItem('Scan', SCAN_PAGE, <ScanOutlined />),
    getItem('More Info', MORE_INFO_PAGE, <InfoCircleOutlined />),
  ];

  const handleMenuClick = (e) => {
    console.log('Menu item clicked:', e.key);
    if (LOGIN_PAGE === e.key) {
      window.location.assign('/');
    } else if (SCAN_PAGE === e.key) {
      window.location.assign('/scan');
    } else if (MORE_INFO_PAGE === e.key) {
      window.location.assign('/more-info');
    }
  };

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
        <ConfigProvider
        theme={{
          token: {
            // Seed Token
            colorPrimary: '#6BBA78'
          },
        }}
      >
      <Layout
      style={{
        minHeight: '100vh',
      }}
      >
        <Header style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#6BBA78'
        }}
        >
          {/* Placeholder to keep the title centered */}
          <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}><img src='/karmacart-logo.png' alt="logo" width={40} height={40} /></div>
          <div style={{ flex: 1, textAlign: 'center', color: 'white', fontSize: '20px' }}>KarmaCart</div>
          {/* Hamburger Button */}
          <div style={{ flex: 1, textAlign: 'right' }}>
            <Button type="primary" onClick={showDrawer}> 
              <MenuOutlined />
            </Button>
          </div>
        </Header>
        <Drawer title="Menu" width="200px" placement="right" onClick={onClose} onClose={onClose} open={visible}>
          <Menu defaultSelectedKeys={['1']} mode="inline" items={items} onClick={handleMenuClick} />
        </Drawer>
        <Router>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/scan" element={<Scan />} />
              <Route path="/more-info" element={<MoreInfoPage />} />
            </Routes>
        </Router>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
        KarmaCart created by Anderson Buckles
        </Footer>
    </Layout>
    </ConfigProvider>
  );
};
export default App;