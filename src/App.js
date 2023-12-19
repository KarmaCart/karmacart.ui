import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  InfoCircleOutlined,
  UserOutlined,
  ScanOutlined,
} from '@ant-design/icons';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout, Menu, Button, theme, } from 'antd';
import BarcodeScanner from './pages/BarcodeScanner';
import LoginScreen from './pages/LoginScreen';
import MoreInfo from './pages/MoreInfo'
const { Header, Sider } = Layout;
const App = () => {

  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer, colorBgMask },
  } = theme.useToken();

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

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div style={{
            height: 32,
            margin: 16,
            background: colorBgMask,
            borderRadius: 6,
        }} />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          onClick={handleMenuClick}
          items={[
            {
              key: 'LoginScreen',
              icon: <UserOutlined />,
              label: 'Account',
            },
            {
              key: 'BarcodeScanner',
              icon: <ScanOutlined />,
              label: 'Scan',
            },
            {
              key: 'MoreInfo',
              icon: <InfoCircleOutlined />,
              label: 'More Info',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Router>
            <Routes>
              <Route path="/" element={<LoginScreen />} />
              <Route path="/scan" element={<BarcodeScanner />} />
              <Route path="/more-info" element={<MoreInfo />} />
            </Routes>
        </Router>
      </Layout>
    </Layout>
  );
};
export default App;