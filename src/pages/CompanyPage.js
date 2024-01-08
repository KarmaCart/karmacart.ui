import React, { useState, useEffect } from 'react';
import { Row, Col, Collapse, Layout, theme, Tooltip, Modal } from 'antd';
import { useLocation } from 'react-router-dom';
import './CompanyPage.css';

const { Content } = Layout;
const { Panel } = Collapse;

const CompanyPage = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleOk = () => {
    setIsModalOpen(false);
  };
  
  const location = useLocation();
  let barcodeText = location.state.barcode.decodedText;
  barcodeText = barcodeText.padStart(13, '0')

  const methodProductLtdPk = '0817939012390'

  let company;
  let shouldOpenModal = false;
  if (barcodeText === methodProductLtdPk) { 
    company = {
      name: 'Method Products Ltd',
      address: '12 York GatelondonNW1 4QS',
      annualRevenue: '$21,600,000',
      website: 'https://www.methodproducts.co.uk',
      ethicalScore: '4'
    }; 
  } else {
    shouldOpenModal = true;
    company = {
      name: 'Example Low Score',
      address: '1234 Smallville USA',
      annualRevenue: '$1,000,000',
      website: 'https://www.ethicalconsumer.org/',
      ethicalScore: '5'
    }; 
  }

  const temporaryText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

  console.log(`Rendering ItemPage with barcode: ${JSON.stringify(location.state.barcode)}`);

   // Determine badge color based on value
  const badgeColor = company.ethicalScore >= 15 ? 'green' : 'red';

  useEffect(() => {
    if (shouldOpenModal) {
      setIsModalOpen(true);
    }
  }, []);

  return(
  <>
    <Modal title="Barcode Not Found" open={isModalOpen} onOk={handleOk} onCancel={handleOk}>
      <p>Unfortunately, your barcode was not found in our system. You can still view this example company page.</p>
      <p>Check out the 'Scan Examples' page, for barcode examples.</p>
    </Modal>
    <Content
      style={{
        margin: '24px 16px',
        padding: 24,
        minHeight: 280,
        background: colorBgContainer,
        borderRadius: borderRadiusLG
      }}
    >
      {/* Section 1 */}
      <Row justify="center">
        {/* Subsection 1 & 2 for laptops, they stack on mobile */}
        <Col xs={24} sm={24} lg={12}>
          <div className="section-title">
            <div className="section-content">
              <h2>{company.name}</h2>
            </div>
            <Tooltip style={{verticalAlign: 'top'}} title="Score (out of 20)">
              <span><div className="score-badge" style={{borderColor: badgeColor}}>{company.ethicalScore}</div></span>
            </Tooltip>
          </div>
          <div className="subsection">
            <h2>Company information</h2>
            <h4>Company Address:</h4><p>{company.address}</p>
            <br></br>
            <h4>Annual Revenue: {company.annualRevenue}</h4>
            <h4>Website: <a href={company.website}>{company.website}</a></h4>
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
              <p>The environmental breakdown for {company.name}: {temporaryText}</p>
            </Panel>
            <Panel header="People" key="2">
              <p>The ethics involving people for {company.name}: {temporaryText}</p>
            </Panel>
            <Panel header="Animals" key="3">
              <p>The ethics involving animals for {company.name}: {temporaryText}</p>
            </Panel>
            <Panel header="Politics" key="4">
              <p>The ethics involving politics for {company.name}: {temporaryText}</p>
            </Panel>
          </Collapse>
        </Col>
      </Row>
    </Content>
  </>
  );
};

export default CompanyPage;