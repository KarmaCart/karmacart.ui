import React, { useState } from 'react';
import {
  InfoCircleOutlined,
  UserOutlined,
  ScanOutlined,
  MenuOutlined
} from '@ant-design/icons';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout, Menu, Button, Drawer } from 'antd';
import Scan from './pages/ScanPage';
import LoginScreen from './pages/LoginPage';
import MoreInfo from './pages/MoreInfoPage'
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

  const LOGIN_PAGE = 'LOGIN_PAGE'
  const SCAN_PAGE = 'SCAN_PAGE'
  const MORE_INFO_PAGE = 'MORE_INFO_PAGE'
  
  const items = [
    getItem('Account', LOGIN_PAGE, <UserOutlined />),
    getItem('Scan', SCAN_PAGE, <ScanOutlined />),
    getItem('More Info', MORE_INFO_PAGE, <InfoCircleOutlined />),
  ];

  const handleMenuClick = (e) => {
    console.log('Menu item clicked:', e.key);
    if (LOGIN_PAGE === e.key) {
      window.location.assign('/')
    } else if (SCAN_PAGE === e.key) {
      window.location.assign('/scan')
    } else if (MORE_INFO_PAGE === e.key) {
      window.location.assign('/more-info')
    }
  };

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
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
        }}
        >
          {/* Placeholder to keep the title centered */}
          <div style={{ flex: 1 }}></div>
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
              <Route path="/" element={<LoginScreen />} />
              <Route path="/scan" element={<Scan />} />
              <Route path="/more-info" element={<MoreInfo />} />
            </Routes>
        </Router>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
        KarmaCart Created by Anderson Buckles
        </Footer>
    </Layout>
  );
};
export default App;