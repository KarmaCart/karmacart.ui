import React, { useState, useEffect } from 'react';
import { Row, Col, Collapse, Layout, theme, Modal, Spin, Alert } from 'antd';
import { useLocation } from 'react-router-dom';
import EthicalScore from '../components/EthicalScore'
import './CompanyPage.css';
import axios from 'axios';

const { Content } = Layout;
const { Panel } = Collapse;

const CompanyPage = ({setSelectedMenuKey}) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    setSelectedMenuKey(null);
  }, [setSelectedMenuKey]);

  
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleOk = () => {
    setIsModalOpen(false);
  };
  
  const location = useLocation();
  let barcodeText = location.state.barcode.text;
  barcodeText = barcodeText.padStart(13, '0');

  let shouldOpenModal = false;

  const temporaryText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

  console.log(`Rendering ItemPage with barcode: ${JSON.stringify(location.state.barcode)}`);

  
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    axios.get(`https://karma-cart-api-eng.andersbuck.dev/company/${barcodeText}`)
        .then(response => {
            if (200 === response.status) {
                return response.data;
            }
            throw new Error('Network response was not ok.');
        })
        .then(data => {
            setData(data);
            setLoading(false);
        })
        .catch(error => {
            console.error('There was a problem with the get company operation:', error);
            setError(error);
            setLoading(false);
        });
  }, [barcodeText]);

  useEffect(() => {
    if (shouldOpenModal) {
      setIsModalOpen(true);
    }
  }, [shouldOpenModal]);

  return(
    <Content
    style={{
      margin: '24px 16px',
      padding: 24,
      minHeight: 280,
      background: colorBgContainer,
      borderRadius: borderRadiusLG
    }}
    >
    {loading && <div style={{ paddingTop: '30vh' }}><Spin tip="Loading" size="large"><div className="content" /></Spin></div>}
    {error && <div><Alert message="Error" description="Error occurred loading data, please try again later." type="error" showIcon/></div>}
    {data && 
    <>
      <Modal title="Barcode Not Found" open={isModalOpen} onOk={handleOk} onCancel={handleOk}>
        <p>Unfortunately, your barcode was not found in our system. You can still view this example company page.</p>
        <p>Check out the 'Scan Examples' page, for barcode examples.</p>
      </Modal>

      {/* Section 1 */}
      <Row justify="center">
        <Col xs={24} sm={24} lg={12}>
          <div className="section-title">
            <div className="section-content">
              <h2>{data.companyName}</h2>
            </div>
            <EthicalScore score={data.ethicalScore} />
          </div>
          <div className="subsection">
            <h2>Company information</h2>
            <h4>Company Address:</h4><p>{data.address}</p>
            <br></br>
            <h4>Annual Revenue: {data.annualRevenue}</h4>
            <h4>Website: <a href={data.website}>{data.website}</a></h4>
          </div>
        </Col>
      </Row>

      {/* Section 2 */}
      <Row justify="center">
        <Col xs={24} sm={24} lg={12}>
          <div className="section"><h2>Suggested Products</h2></div>
          <div className="subsection">Suggested Product</div>
        </Col>
      </Row>

      {/* Section 3 */}
      <Row justify="center">
        <Col xs={24} sm={24} lg={12}>
          <div className="section"><h2>Ownership Structure</h2></div>
          <div className="subsection">Ownership Structure</div>
        </Col>
      </Row>

      {/* Section 4 */}
      <Row justify="center">
        <Col xs={24} sm={24} lg={12}>
          <div className="section"><h2>Ethical Breakdown</h2></div>
          <Collapse>
            <Panel header="Environment" key="1">
              <p>The environmental breakdown for {data.name}: {temporaryText}</p>
            </Panel>
            <Panel header="People" key="2">
              <p>The ethics involving people for {data.name}: {temporaryText}</p>
            </Panel>
            <Panel header="Animals" key="3">
              <p>The ethics involving animals for {data.name}: {temporaryText}</p>
            </Panel>
            <Panel header="Politics" key="4">
              <p>The ethics involving politics for {data.name}: {temporaryText}</p>
            </Panel>
          </Collapse>
        </Col>
      </Row>
    </>}
    </Content>
  );
};

export default CompanyPage;