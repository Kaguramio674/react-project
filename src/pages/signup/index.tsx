import React, { useState } from 'react';
import { Form, Input, Button, message, Row, Col } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, GiftOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';

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

  const onFinish = (values: FormValues) => {
    if (values.invitationCode !== 'AAAAAA') {
      message.error('邀请码不正确,不允许注册');
      return;
    }
    // 在此处处理注册逻辑
    message.success('注册成功');
  };
  const validatePassword = (_: any, value: string) => {
    if (value && !/^[\w!@#$%^&*()-=+]{8,20}$/.test(value)) {
      return Promise.reject('密码必须在8-20位之间');
    }
    return Promise.resolve();
  };

  const validateUsername = (_: any, value: string) => {
    if (value && !/^[A-Za-z0-9]{5,20}$/.test(value)) {
      return Promise.reject('用户名必须在5-20位之间,且只能包含英文字母和数字');
    }
    return Promise.resolve();
  };
  

  return (
    <Row justify="center" align="middle" >
      <Col xs={20} sm={16} md={12} lg={8}>
        <h2 style={{ textAlign: 'center' }}>注册</h2>
        <Form form={form} onFinish={onFinish}>
          <Form.Item
            name="username"
            rules={[
              { required: true, message: '请输入用户名' },
              { validator: validateUsername },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="用户名" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: '请输入邮箱' },
              { type: 'email', message: '请输入有效的邮箱地址' },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="邮箱" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: '请输入密码' },
              { validator: validatePassword },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="密码" />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: '请再次输入密码' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两次输入的密码不匹配'));
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="确认密码" />
          </Form.Item>
          <Form.Item
            name="invitationCode"
            rules={[{ required: true, message: '请输入邀请码' }]}
          >
            <Input prefix={<GiftOutlined />} placeholder="邀请码" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              注册
            </Button>
          </Form.Item>
        </Form>
        <div style={{ textAlign: 'center' }}>
          <span>已经有账号了?</span>
          <a style={{ marginLeft: '8px' }} onClick={() => router.push('/login')}>
            点击登录
          </a>
        </div>
      </Col>
    </Row>
  );
};

export default RegistrationForm;