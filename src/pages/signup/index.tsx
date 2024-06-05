import React, { useState } from 'react';
import { Form, Input, Button, message, Row, Col } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, GiftOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { register } from '@/api/user';

interface FormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  invitationCode: string;
  captcha: string;
}

const RegistrationForm: React.FC = () => {
  const router = useRouter()
  const [form] = Form.useForm();
  const [captcha, setCaptcha] = useState('');

  const onFinish = async (values: FormValues) => {
    if (values.invitationCode !== 'AAAAAA') {
      message.error('Error');
      return;
    }
  
    try {
      await register({
        username: values.username,
        email: values.email,
        password: values.password,
        identity: 'user',
      });
      message.success('Sign up success! Please log in.');
      router.push('/login');
    } catch (error) {
      message.error('Sign up failed. Please try again later.');
    }
  };
  const validatePassword = (_: any, value: string) => {
    if (value && !/^[\w!@#$%^&*()-=+]{8,20}$/.test(value)) {
      return Promise.reject('Password must be 8-20 characters long and can only contain letters, numbers, and special characters');
    }
    return Promise.resolve();
  };

  const validateUsername = (_: any, value: string) => {
    if (value && !/^[A-Za-z0-9]{5,20}$/.test(value)) {
      return Promise.reject('Username must be 5-20 characters long and can only contain letters and numbers');
    }
    return Promise.resolve();
  };
  

  return (
    <Row justify="center" align="middle" >
      <Col xs={20} sm={16} md={12} lg={8}>
        <h2 style={{ textAlign: 'center' }}>Sign Up</h2>
        <Form form={form} onFinish={onFinish}>
          <Form.Item
            name="username"
            rules={[
              { required: true, message: 'Please input username' },
              { validator: validateUsername },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="  username" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please input your email' },
              { type: 'email', message: 'Please input a valid email address' },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="  email"/>
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Please input password' },
              { validator: validatePassword },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="  password"/>
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please input same password again' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Passwords do not match'));
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Confirm Password"/>
          </Form.Item>
          <Form.Item
            name="invitationCode"
            rules={[{ required: true, message: 'invitationCode' }]}
          >
            <Input prefix={<GiftOutlined />} placeholder="invitationCode" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Sign Up
            </Button>
          </Form.Item>
        </Form>
        <div style={{ textAlign: 'center' }}>
          <span>Already have an account?</span>
          <a style={{ marginLeft: '8px' }} onClick={() => router.push('/login')}>
          Log in
          </a>
        </div>
      </Col>
    </Row>
  );
};

export default RegistrationForm;