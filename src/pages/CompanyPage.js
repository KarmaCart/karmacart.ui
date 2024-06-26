import React, { useState, useEffect } from 'react'
import { Row, Col, Collapse, Layout, theme, Modal, Spin, Alert, Card } from 'antd'
import { useLocation } from 'react-router-dom'
import EthicalScore from '../components/EthicalScore'
import '../css/Section.css'
import axios, { AxiosError, HttpStatusCode } from 'axios'
import styled from 'styled-components'
import { KARMACART_API_URL } from '../utils/ApiUtils'
import PropTypes from 'prop-types'

const { Content } = Layout
const { Panel } = Collapse

const StyledCard = styled(Card)`
.ant-card-head {
  padding: 2px 10px;
  border-bottom: 0;
  font-size: 24px;
  font-weight: bold;
}
`

const CompanyPage = ({ setSelectedMenuKey }) => {
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()

  useEffect(() => {
    setSelectedMenuKey(null)
  }, [setSelectedMenuKey])

  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const location = useLocation()
  let barcodeText = location.state.barcode.text
  // Pad the barcode so it is always the appropriate standard barcode length
  barcodeText = barcodeText.padStart(13, '0')

  const shouldOpenModal = false

  console.log(`Rendering ItemPage with barcode: ${JSON.stringify(location.state.barcode)}`)

  const [companyData, setCompanyData] = useState(null)
  const [productData, setProductData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const formatUsdCurrency = (number) => {
    const currency = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })

    return currency.format(number)
  }

  useEffect(() => {
    const fetchProductAndCompanyData = async (productBarcode) => {
      await axios.get(`${KARMACART_API_URL}/product/${productBarcode}`)
        .then(response => {
          if (HttpStatusCode.Ok === response.status) {
            return response.data
          }
          throw new Error('Network response was not ok.')
        })
        .then(productData => {
          setProductData(productData)
          return productData.pk.replace('COMPANY#', '')
        })
        .then(companyId => {
          return axios.get(`${KARMACART_API_URL}/company/${companyId}`)
        })
        .then(response => {
          if (HttpStatusCode.Ok === response.status) {
            return response.data
          }
          throw new Error('Network response was not ok.')
        })
        .then(companyData => {
          setCompanyData(companyData)
        })
    }

    const fetchPageData = async () => {
      try {
        try {
          await fetchProductAndCompanyData(barcodeText)
        } catch (err) {
          if (err instanceof AxiosError) {
            if (HttpStatusCode.NotFound === err.response?.status) {
              // If a barcode wasn't found then load a random Company page for a random Product.
              await axios.get(`${KARMACART_API_URL}/product`)
                .then(response => {
                  if (HttpStatusCode.Ok === response.status) {
                    return response.data
                  }
                  throw new Error('Network response was not ok.')
                })
                .then(products => {
                  const randomIndex = Math.floor(Math.random() * products.length)
                  return fetchProductAndCompanyData(products[randomIndex].sk.replace('PRODUCT#', ''))
                })
              setIsModalOpen(true)
            } else {
              throw err
            }
          } else {
            throw err
          }
        }
      } catch (error) {
        console.error('Failed to fetch data:', error)
        setError(error)
      } finally {
        setIsLoading(false) // Update loading state
      }
    }

    fetchPageData()
  }, [barcodeText]) // Empty dependency array means this effect runs once on mount

  useEffect(() => {
    if (shouldOpenModal) {
      setIsModalOpen(true)
    }
  }, [shouldOpenModal])

  const cardBordered = false
  const cardBodyStyle = { padding: '2px 10px' }
  const cardStyle = { backgroundColor: '#ebfaeb' }

  return (
    <Content
    style={{
      margin: '24px 16px',
      padding: 20,
      minHeight: 280,
      background: colorBgContainer,
      borderRadius: borderRadiusLG,
      ...(isLoading) && {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }
    }}
    >
    {isLoading && <Spin size="large"></Spin>}
    {error && <div><Alert message="Error" description="Error occurred loading data, please try again later." type="error" showIcon/></div>}
    {companyData && productData &&
      <div>
        <Modal title="Barcode Not Found" open={isModalOpen} onOk={handleOk} onCancel={handleOk}>
          <p>Unfortunately, your barcode was not found in our system. You can still view this example.</p>
          <p>Check out the &apos;Products&apos; page for a list of all products or &apos;Scan Examples&apos; page for barcode examples.</p>
        </Modal>

        <h1 style={{ margin: '0 0 10px 0' }}>{companyData.companyName}</h1>
        {/* Company Information */}
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <StyledCard title="Company Information" bordered={cardBordered} bodyStyle={cardBodyStyle} style={cardStyle}>
              <Row gutter={[8, 8]}>
                <Col span={16}>
                  <p><strong>Location: </strong>{companyData.address}</p>
                  <p><strong>Annual Revenue: </strong>{formatUsdCurrency(companyData.annualRevenue)}</p>
                  <p><strong>Website: </strong><a href={companyData.website}>{companyData.website}</a></p>
                </Col>
                <Col span={8}>
                  <div style={{ display: 'flex', justifyContent: 'center' }}><EthicalScore score={companyData.ethicalScore} size='large' showDesc={true} /></div>
                </Col>
              </Row>
            </StyledCard>
          </Col>

          {/* Scanned Product Information */}
          <Col xs={24} lg={12}>
            <StyledCard title="Product" bordered={cardBordered} bodyStyle={cardBodyStyle} style={cardStyle}>
              <p><strong>Name:</strong> {productData.productName}</p>
              <p><strong>Description:</strong> {productData.productDescription}</p>
            </StyledCard>
          </Col>
        </Row>

        {/* Ethical Breakdown */}
        <StyledCard title="Ethical Breakdown" bordered={cardBordered} bodyStyle={cardBodyStyle} style={{ ...cardStyle, ...{ marginTop: '20px' } }}>
          <Collapse style={{ backgroundColor: '#dcf6e1' }}>
            <Panel header="Environment" key="1">
              <p>The environmental breakdown for {companyData.companyName}:  Here there would be a more detailed description of the ethics relating to the environment.</p>
            </Panel>
            <Panel header="People" key="2">
              <p>The ethics involving people for {companyData.companyName}: Here there would be a more detailed description of the ethics relating to people.</p>
            </Panel>
            <Panel header="Animals" key="3">
              <p>The ethics involving animals for {companyData.companyName}: Here there would be a more detailed description of the ethics relating to animals.</p>
            </Panel>
            <Panel header="Politics" key="4">
              <p>The ethics involving politics for {companyData.companyName}: Here there would be a more detailed description of the ethics relating to politics.</p>
            </Panel>
          </Collapse>
        </StyledCard>
      </div>
    }
    </Content>
  )
}

export default CompanyPage

CompanyPage.propTypes = {
  setSelectedMenuKey: PropTypes.func
}
