import React, { useState } from 'react';
import {
  InfoCircleOutlined,
  HomeOutlined,
  ScanOutlined,
  MenuOutlined
} from '@ant-design/icons';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Layout, Menu, Button, Drawer, ConfigProvider } from 'antd';
import ScanPage from './pages/ScanPage';
import MoreInfoPage from './pages/MoreInfoPage';
import ItemPage from './pages/ItemPage';
import HomePage from './pages/HomePage';
const { Header, Footer } = Layout;

const App = () => {

  const [visible, setVisible] = useState(false);

  let navigate = useNavigate();

  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }

  const HOME_PAGE = 'HOME_PAGE';
  const SCAN_PAGE = 'SCAN_PAGE';
  const MORE_INFO_PAGE = 'MORE_INFO_PAGE';
  
  const items = [
    getItem('Home', HOME_PAGE, <HomeOutlined />),
    getItem('Scan', SCAN_PAGE, <ScanOutlined />),
    getItem('More Info', MORE_INFO_PAGE, <InfoCircleOutlined />),
  ];

  const handleMenuClick = (e) => {
    console.log('Menu item clicked:', e.key);
    if (HOME_PAGE === e.key) {
      navigate('/');
    } else if (SCAN_PAGE === e.key) {
      navigate('/scan');
    } else if (MORE_INFO_PAGE === e.key) {
      navigate('/more-info');
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
          <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}><img src='/karmacart-logo.png' alt="logo" width={45} height={45} /></div>
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
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/scan" element={<ScanPage />} />
            <Route path="/item" element={<ItemPage />} />
            <Route path="/more-info" element={<MoreInfoPage />} />
          </Routes>
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