import React from 'react';
import { Layout, theme, Row, Col, Button } from 'antd';
import { GithubOutlined, LinkedinOutlined } from '@ant-design/icons';
import './MoreInfoPage.css'; 

const { Content } = Layout;

const MoreInfoPage = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const socialLinks = [
    {
      type: 'GitHub',
      icon: <GithubOutlined />,
      url: 'https://github.com/andersbuck',
    },
    {
      type: 'LinkedIn',
      icon: <LinkedinOutlined />,
      url: 'https://www.linkedin.com/in/andersbuck',
    },
  ];

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
    <p>This demo application was created by Anderson Buckles</p>
    <p>Find out more about this demo <a href='https://github.com/KarmaCart'>on GitHub</a></p>
    <div className="social-section">
      <Row justify="center">
        {socialLinks.map(link => (
          <Col key={link.type}>
            <Button type="link" href={link.url} target="_blank" icon={link.icon}>
              {link.type}
            </Button>
          </Col>
        ))}
      </Row>
    </div>
  </Content>
  );
};

export default MoreInfoPage