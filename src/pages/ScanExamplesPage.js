import React from 'react';
import { Layout, theme, Row, Col, List, Button, Card } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import './ScanExamplesPage.css'

const { Content } = Layout;

const ScanExamplesPage = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const exampleFiles = [
    {
      name: 'Method All-Purpose Cleaner',
      description: "Example of 'Method All-Purpose Cleaner' barcode:",
      downloadLink: '/method-barcode.png',
    }
  ];

  return(
    <Content
      justify='center'
      style={{
        margin: '24px 16px',
        padding: 24,
        minHeight: 280,
        background: colorBgContainer,
        borderRadius: borderRadiusLG
      }}
    >
      <Row justify="center">
        <Col xs={24} sm={18} md={16} lg={12} xl={10}>
          <div className="section-title"><h2>Scan Examples</h2></div>
          <div className="subsection">
            <p>
              This page offers downloadable example barcodes for use with the Scan page to display preloaded ethical ratings for companies.
            </p>
            <p>
              Ethical ratings sourced from <a href='https://www.ethicalconsumer.org/'>https://www.ethicalconsumer.org/</a> 
            </p>
          </div>
          <List
            grid={{ gutter: 16, column: 1 }}
            dataSource={exampleFiles}
            renderItem={item => (
              <List.Item>
                <Card>
                  {/* Flex container for content and button */}
                  <div className="card-content">
                    <div className="text-content">
                      {item.name}&nbsp;
                    </div>
                    <a href={item.downloadLink} download target="_blank" rel="noopener noreferrer">
                      <Button type="primary" icon={<DownloadOutlined />}>
                        Download
                      </Button>
                    </a>
                    </div>
                </Card>
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </Content>
  );
};

export default ScanExamplesPage;