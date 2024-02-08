import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Spin, Alert, theme, Layout, Table} from 'antd';
import axios from 'axios';
import { COMPANIES_PAGE } from '../App';
import EthicalScore from '../components/EthicalScore';

const { Content } = Layout;

const CompaniesPage = ({setSelectedMenuKey}) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  let navigate = useNavigate();

  useEffect(() => {
    setSelectedMenuKey(COMPANIES_PAGE);
  }, [setSelectedMenuKey]);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`https://karma-cart-api-eng.andersbuck.dev/company`)
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
            console.error('There was a problem with the get companies operation:', error);
            setError(error);
            setLoading(false);
        });
  }, []);

  // Function to handle the selection of a company
  const handleSelectCompany = (record) => {
    // Navigate to the company page
    navigate('/company', { state: { barcode: { text: record.pk.replace('COMPANY#', '') } } });
  };

  const formatUsdCurrency = (number) => {
    const currency = new Intl.NumberFormat('en-US', { 
      style: 'currency',
      currency: 'USD'
    });

    return currency.format(number)
  }

  const renderMobileTable = (columns) => {
    return columns.filter(
      column => column.key === "companyName" || column.key === "ethicalScore"
    );
  };

  let columns = [
    {
      title: 'Company Name',
      dataIndex: 'companyName',
      key: 'companyName',
      render: (text, record) => <><Button type="link" onClick={() => handleSelectCompany(record)}>{text}</Button></>,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Annual Revenue',
      dataIndex: 'annualRevenue',
      key: 'annualRevenue',
      render: (_, { annualRevenue }) => {
        return formatUsdCurrency(annualRevenue);
      }
    },
    {
      title: 'Ethical Score',
      key: 'ethicalScore',
      dataIndex: 'ethicalScore',
      render: (_, { ethicalScore }) => (
        <>
          <EthicalScore score={ethicalScore} size='small' showDesc={false} />
        </>
      ),
    },
    {
      title: 'Website',
      dataIndex: 'website',
      key: 'website',
    },
  ];

  const isMobile = window.innerWidth < 700;
  if (isMobile) {
    columns = renderMobileTable(columns);
  }

  return (
    <Content
    style={{
      margin: '24px 16px',
      minHeight: 280,
      background: colorBgContainer,
      borderRadius: borderRadiusLG
    }}
    >
    {loading && <div style={{ paddingTop: '30vh' }}><Spin tip="Loading" size="large"><div className="content" /></Spin></div>}
    {error && <div><Alert message="Error" description="Error occurred loading data, please try again later." type="error" showIcon/></div>}
    {data && <div style={{ padding: '20px', textAlign: 'center'}}>
      <h2>Companies</h2>
      <Table columns={columns} dataSource={data} />
    </div>}
    </Content>
  );
};

export default CompaniesPage;