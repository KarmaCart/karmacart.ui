import React, { useState } from 'react';
import {
  MenuOutlined,
  HomeOutlined,
  ShoppingOutlined,
  ScanOutlined,
  DownloadOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Layout, Menu, Button, Drawer, ConfigProvider } from 'antd';
import ScanPage from './pages/ScanPage';
import CompanyPage from './pages/CompanyPage';
import ScanExamplesPage from './pages/ScanExamplesPage';
import MoreInfoPage from './pages/MoreInfoPage';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
const { Header, Footer } = Layout;

export const HOME_PAGE = 'HOME_PAGE';
export const PRODUCTS_PAGE = 'COMPANIES_PAGE';
export const SCAN_PAGE = 'SCAN_PAGE';
export const SCAN_EXAMPLES_PAGE = 'SCAN_EXAMPLES_PAGE';
export const MORE_INFO_PAGE = 'MORE_INFO_PAGE';

const App = () => {

  const [visible, setVisible] = useState(false);
  const [menuKey, setSelectedMenuKey] = useState(null);

  let navigate = useNavigate();

  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  
  const items = [
    getItem('Home', HOME_PAGE, <HomeOutlined />),
    getItem('Products', PRODUCTS_PAGE, <ShoppingOutlined />),
    getItem('Scan', SCAN_PAGE, <ScanOutlined />),
    getItem('Scan Examples', SCAN_EXAMPLES_PAGE, <DownloadOutlined />),
    getItem('More Info', MORE_INFO_PAGE, <InfoCircleOutlined />),
  ];

  const handleMenuClick = (e) => {
    console.log('Menu item clicked:', e.key);
    if (HOME_PAGE === e.key) {
      navigate('/');
    } else if (PRODUCTS_PAGE === e.key) {
      navigate('/products');
    } else if (SCAN_PAGE === e.key) {
      navigate('/scan');
    } else if (SCAN_EXAMPLES_PAGE === e.key) {
      navigate('/scan-examples');
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
        <Drawer title="Menu" width="220px" placement="right" onClick={onClose} onClose={onClose} open={visible}>
          <Menu selectedKeys={[menuKey]} mode="inline" items={items} onClick={handleMenuClick} />
        </Drawer>
        <Routes>
          <Route path="/" element={<HomePage setSelectedMenuKey={setSelectedMenuKey}/>} />
          <Route path="/scan" element={<ScanPage setSelectedMenuKey={setSelectedMenuKey}/>} />
          <Route path="/company" element={<CompanyPage setSelectedMenuKey={setSelectedMenuKey}/>} />
          <Route path="/products" element={<ProductsPage setSelectedMenuKey={setSelectedMenuKey}/>} />
          <Route path="/scan-examples" element={<ScanExamplesPage setSelectedMenuKey={setSelectedMenuKey}/>} />
          <Route path="/more-info" element={<MoreInfoPage setSelectedMenuKey={setSelectedMenuKey}/>} />
        </Routes>
        <Footer
          style={{
            textAlign: 'center'
          }}
        >
        KarmaCart created by Anderson Buckles
        </Footer>
    </Layout>
    </ConfigProvider>
  );
};
export default App;