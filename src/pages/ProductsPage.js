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

  // Product data combined with company data
  const [productData, setProductData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch data from both APIs and combine the results
    const fetchData = async () => {
      try {
        const karmacartApiHost = 'https://karma-cart-api-eng.andersbuck.dev/'
        const urls = ['product', 'company']; // Replace with your actual API URLs
        const allPromises = urls.map(url => 
          axios.get(karmacartApiHost + url)
            .then(response => {
              if (200 === response.status) {
                  return response.data;
              }
              throw new Error('Network response was not ok.');
            }));
        
        // Wait for all promises to resolve
        const results = await Promise.all(allPromises);

        // Join Product and Company data to build the product data view.
        const productData = []
        for (const product of results[0]) {
          for (const company of results[1]) {

            if (company.pk ===  product.pk) {
              // Join to the Company data to get the ethical score.
              productData.push({
                barcodeText: product.sk.replace('PRODUCT#', ''),
                productName: product.productName,
                ethicalScore: company.ethicalScore
              })
              break;
            }
          }
        }
        
        setProductData(productData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setError(error);
      } finally {
        setIsLoading(false); // Update loading state
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once on mount

  // Function to handle the selection of a company
  const handleSelectCompany = (record) => {
    // Navigate to the company page
    navigate('/company', { state: { barcode: { text: record.barcodeText } } });
  };

  let columns = [
    {
      title: 'Product',
      dataIndex: 'productName',
      key: 'productName',
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
      padding: '20px',
      display: 'flex',
      justifyContent: 'center',
      ...(isLoading) && {
        alignItems: 'center'
      }
    }}
    >
    {isLoading && <Spin size="large"></Spin>}
    {error && <div><Alert message="Error" description="Error occurred loading data, please try again later." type="error" showIcon/></div>}
    {productData && 
      <div>
        <Table columns={columns} dataSource={productData} />
      </div>
    }
    </Content>
  );
};

export default ProductsPage;