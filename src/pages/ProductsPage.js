import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Spin, Alert, theme, Layout, Table, Tooltip} from 'antd';
import axios from 'axios';
import { PRODUCTS_PAGE } from '../App';
import EthicalScore from '../components/EthicalScore';

const { Content } = Layout;

const ProductsPage = ({setSelectedMenuKey}) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  let navigate = useNavigate();

  useEffect(() => {
    setSelectedMenuKey(PRODUCTS_PAGE);
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

  let columns = [
    {
      title: 'Product',
      dataIndex: 'companyName',
      key: 'companyName',
      render: (text, record) => <><Button type="link" size={'large'} onClick={() => handleSelectCompany(record)} style={{padding: 0}}>{text}</Button></>,
    },
    {
      title: <Tooltip title='Score out of 20'><span>Ethical Score</span></Tooltip>,
      key: 'ethicalScore',
      dataIndex: 'ethicalScore',
      align: 'center',
      render: (_, { ethicalScore }) => (
        <>
          <EthicalScore score={ethicalScore} size='small' showDesc={false} />
        </>
      ),
    }
  ];

  return (
    <Content
    style={{
      margin: '24px 16px',
      background: colorBgContainer,
      borderRadius: borderRadiusLG,
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
    }}
    >
    {loading && <Spin size="large"></Spin>}
    {error && <div><Alert message="Error" description="Error occurred loading data, please try again later." type="error" showIcon/></div>}
    {data && <div style={{ padding: '20px' }}>
      <Table columns={columns} dataSource={data} />
    </div>}
    </Content>
  );
};

export default ProductsPage;