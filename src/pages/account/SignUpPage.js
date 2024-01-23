import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { signUp } from 'aws-amplify/auth';

const SignUpPage = () => {

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
      setLoading(true);
      try {
          const { username, password } = values;
          await signUp({
              username,
              password,
              options: {
                autoSignIn: true
              }
              
          });
          // Handle successful signup
      } catch (error) {
          // Handle sign up error
      }
      setLoading(false);
  };

  return (
      <Form form={form} onFinish={onFinish}>
          <Form.Item name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
              <Input placeholder="Username" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
              <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
              <Input placeholder="Email" />
          </Form.Item>
          <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                  Sign Up
              </Button>
          </Form.Item>
      </Form>
  );
};

export default SignUpPage