import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { confirmSignUp } from 'aws-amplify/auth';

const VerificationPage = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const { confirmationCode, username } = values;
            await confirmSignUp({
                username,
                confirmationCode
              });
            message.success('Account verified successfully!', 5);
            // Redirect to sign-in page or dashboard
        } catch (error) {
            console.error('Failed to verify account', error);
            message.error('Failed to verify account. Please try again.', 5);
        }
        setLoading(false);
    };

    return (
        <Form form={form} onFinish={onFinish}>
            <Form.Item name="username" rules={[{ required: true, message: 'Please enter your username!' }]}>
                <Input placeholder="Username" />
            </Form.Item>
            <Form.Item name="confirmationCode" rules={[{ required: true, message: 'Please enter your verification code!' }]}>
                <Input placeholder="Verification Code" />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Verify Account
                </Button>
            </Form.Item>
        </Form>
    );
};

export default VerificationPage;