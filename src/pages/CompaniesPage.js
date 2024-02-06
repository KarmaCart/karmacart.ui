import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { List, Button, Spin, Alert } from 'antd';
import axios from 'axios';
import { COMPANIES_PAGE } from '../App';

const CompaniesPage = ({setSelectedMenuKey}) => {
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
  const handleSelectCompany = (item) => {
    // Navigate to the company page
    navigate('/company', { state: { barcode: { text: item.pk.S.replace('COMPANY#', '') } } });
  };

  return (
    <>
    {loading && <div style={{ paddingTop: '40vh' }}><Spin tip="Loading" size="large"><div className="content" /></Spin></div>}
    {error && <div><Alert message="Error" description="Error occurred loading data, please try again later." type="error" showIcon/></div>}
    {data && <div style={{ padding: '20px', maxWidth: '400px', alignContent: 'center' }}>
      <List
        header={<h2>Companies</h2>}
        bordered
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <Button 
              type="text" 
              onClick={() => handleSelectCompany(item)}
            >
              {item.companyName.S}
            </Button>
          </List.Item>
        )}
      />
    </div>}
    </>
  );
};

export default CompaniesPage;