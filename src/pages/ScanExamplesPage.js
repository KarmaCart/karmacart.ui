import React, { useState, useEffect } from 'react';
import { Layout, theme, Row, Col, List, Button, Card, Modal } from 'antd';
import { PictureOutlined } from '@ant-design/icons';
import { SCAN_EXAMPLES_PAGE } from '../App';
import './ScanExamplesPage.css'

const { Content } = Layout;

const ScanExamplesPage = ({setSelectedMenuKey}) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [shownExample, setShownExample] = useState('');

  useEffect(() => {
    setSelectedMenuKey(SCAN_EXAMPLES_PAGE);
  }, [setSelectedMenuKey]);

  const exampleFiles = [
    {
      name: 'Astonish Kitchen Cleaner',
      description: "Example of 'Astonish Kitchen Cleaner' barcode:",
      imagePath: '/astonish-barcode.png',
    },
    {
      name: 'Method All-Purpose Cleaner',
      description: "Example of 'Method All-Purpose Cleaner' barcode:",
      imagePath: '/method-barcode.png',
    },
    {
      name: 'Cawston Press Soft Drink',
      description: "Example of 'Cawston Press Soft Drink' barcode:",
      imagePath: '/cawston-barcode.png',
    },
    {
      name: 'Coca Cola',
      description: "Example of 'Coca Cola' barcode:",
      imagePath: '/coca-cola-barcode.png',
    }
  ];

  const showModal = (exampleItem) => {
    setShownExample(exampleItem);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
      setIsModalVisible(false);
  };

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
              This page offers example barcodes for use with the Scan page. 
              (Ethical ratings sourced from <a href='https://www.ethicalconsumer.org/'>https://www.ethicalconsumer.org/</a>)
            </p>
            <p>
               To use an example, visit this site on a second device then select an example below.
            </p>
          </div>
          <List
            grid={{ gutter: 16, column: 1 }}
            dataSource={exampleFiles}
            renderItem={exampleItem => (
              <List.Item>
                <Button type="primary" icon={<PictureOutlined />} onClick={() => showModal(exampleItem)} style={{ width: '100%' }}>
                  {exampleItem.name}
                </Button>
              </List.Item>
            )}
          />
        </Col>
      </Row>

      <Modal 
        title={shownExample.name} 
        open={isModalVisible} 
        onCancel={handleCancel}
        footer={null}
      >
        <img src={shownExample.imagePath} alt="Example Preview" style={{ width: '100%' }} />
      </Modal>
    </Content>
  );
};

export default ScanExamplesPage;