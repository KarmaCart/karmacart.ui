import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { signIn, signOut } from 'aws-amplify/auth';

const LoginPage = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const { username, password } = values;
            await signIn({ username, password });
            message.success('Logged in successfully!', 5);
            await signOut();
        } catch (error) {
            console.error('Login failed', error);
            message.error('Login failed. Check your username and password.', 5);
        }
        setLoading(false);
    };

    return (
        <Form form={form} onFinish={onFinish} style={{ maxWidth: 300, margin: 'auto' }}>
            <Form.Item
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input placeholder="Username" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password placeholder="Password" />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading} block>
                    Log In
                </Button>
            </Form.Item>
        </Form>
    );
};

export default LoginPage;