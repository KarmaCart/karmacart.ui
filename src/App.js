import React, { useState } from 'react';
import {
  InfoCircleOutlined,
  UserOutlined,
  ScanOutlined,
  MenuOutlined
} from '@ant-design/icons';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout, Menu, Button, Drawer } from 'antd';
import BarcodeScanner from './pages/BarcodeScanner';
import LoginScreen from './pages/LoginScreen';
import MoreInfo from './pages/MoreInfo'
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
  
  const items = [
    getItem('Account', 'LoginScreen', <UserOutlined />),
    getItem('Scan', 'BarcodeScanner', <ScanOutlined />),
    getItem('More Info', 'MoreInfo', <InfoCircleOutlined />),
  ];

  const handleMenuClick = (e) => {
    console.log('Menu item clicked:', e.key);
    if ('LoginScreen' === e.key) {
      window.location.assign('/')
    } else if ('BarcodeScanner' === e.key) {
      window.location.assign('/scan')
    } else if ('MoreInfo' === e.key) {
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
              <Route path="/scan" element={<BarcodeScanner />} />
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