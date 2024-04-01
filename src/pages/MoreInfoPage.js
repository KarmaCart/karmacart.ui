import React, { useEffect } from 'react'
import { Layout, theme, Row, Col, Tag } from 'antd'
import { GithubOutlined, LinkedinOutlined, MailOutlined } from '@ant-design/icons'
import { MORE_INFO_PAGE } from '../App'
import './MoreInfoPage.css'
import PropTypes from 'prop-types'

const { Content } = Layout

const MoreInfoPage = ({ setSelectedMenuKey }) => {
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()

  useEffect(() => {
    setSelectedMenuKey(MORE_INFO_PAGE)
  }, [setSelectedMenuKey])

  const socialLinks = [
    {
      type: 'GitHub',
      icon: <GithubOutlined />,
      url: 'https://github.com/andersbuck',
      color: '#333'
    },
    {
      type: 'LinkedIn',
      icon: <LinkedinOutlined />,
      url: 'https://www.linkedin.com/in/andersbuck',
      color: '#0077B5'
    },
    {
      type: 'Email',
      icon: <MailOutlined />,
      url: 'mailto:andersbuck.dev@gmail.com',
      color: '#c71610'
    }

  ]

  return (
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
    <p>This demo application was created by Anderson&nbsp;Buckles</p>
    <p>Find out more about this demo <a href='https://github.com/KarmaCart'>on GitHub</a></p>
    <div className="social-section">
      <Row justify="center">
        {socialLinks.map(link => (
          <Col key={link.type}>
            <a href={link.url}>
              <Tag icon={link.icon} color={link.color}>
                {link.type}
              </Tag>
            </a>
          </Col>
        ))}
      </Row>
    </div>
  </Content>
  )
}

export default MoreInfoPage

MoreInfoPage.propTypes = {
  setSelectedMenuKey: PropTypes.func
}
