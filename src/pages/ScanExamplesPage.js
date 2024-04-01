import React, { useState, useEffect } from 'react'
import { Layout, theme, Row, Col, List, Button, Card, Modal } from 'antd'
import { PictureOutlined } from '@ant-design/icons'
import { SCAN_EXAMPLES_PAGE } from '../App'
import styled from 'styled-components'
import '../css/Section.css'
import PropTypes from 'prop-types'

const { Content } = Layout

const StyledCard = styled(Card)`
.ant-card-head {
  padding: 2px 10px;
  border-bottom: 0;
  font-size: 24px;
  font-weight: bold;
}
`

const ScanExamplesPage = ({ setSelectedMenuKey }) => {
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [shownExample, setShownExample] = useState('')

  useEffect(() => {
    setSelectedMenuKey(SCAN_EXAMPLES_PAGE)
  }, [setSelectedMenuKey])

  const exampleFiles = [
    {
      name: 'Astonish Kitchen Cleaner',
      description: "Example of 'Astonish Kitchen Cleaner' barcode:",
      imagePath: '/astonish-barcode.png'
    },
    {
      name: 'Method All-Purpose Cleaner',
      description: "Example of 'Method All-Purpose Cleaner' barcode:",
      imagePath: '/method-barcode.png'
    },
    {
      name: 'Cawston Press Soft Drink',
      description: "Example of 'Cawston Press Soft Drink' barcode:",
      imagePath: '/cawston-barcode.png'
    },
    {
      name: 'Coca Cola',
      description: "Example of 'Coca Cola' barcode:",
      imagePath: '/coca-cola-barcode.png'
    }
  ]

  const showModal = (exampleItem) => {
    setShownExample(exampleItem)
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

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
      borderRadius: borderRadiusLG
    }}
    >
      <div>
        {/* Company Information */}
        <Row gutter={[16, 16]} justify="center">
          {/* Scan Examples */}
          <Col xs={24} lg={10}>
            <StyledCard title="Scan Examples" bordered={cardBordered} bodyStyle={cardBodyStyle} style={cardStyle}>
              <p>
                This page offers example barcodes for use with the Scan page.
                (Ethical ratings sourced from <a href='https://www.ethicalconsumer.org/'>https://www.ethicalconsumer.org/</a>)
              </p>
              <p>
                To use an example, visit this site on a second device then select an example below.
              </p>
            </StyledCard>
            <List
              style={{ paddingTop: '20px' }}
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

          <Modal
            title={shownExample.name}
            open={isModalVisible}
            onCancel={handleCancel}
            footer={null}
          >
            <img src={shownExample.imagePath} alt="Example Preview" style={{ width: '100%' }} />
          </Modal>
        </Row>
      </div>
    </Content>
  )
}

export default ScanExamplesPage

ScanExamplesPage.propTypes = {
  setSelectedMenuKey: PropTypes.func
}
