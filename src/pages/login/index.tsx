import React from 'react';
import { Form, Input, Button, message, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { request } from 'http';
import { login } from '@/api/user';
import { useAuth } from '@/contexts/AuthContext';

interface FormValues {
  username: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const router = useRouter();
  const [form] = Form.useForm();

  const { login: loginContext } = useAuth(); // 重命名为 loginContext 以避免与 user.ts 中的 login 函数冲突

  const onFinish = async (values: FormValues) => {
    try {
      const res = await login(values);
      if (res.success) {
        message.success("Login success!");
        loginContext();
        router.push("/recipe");
      } else {
        message.error(res.message || "Invalid username or password");
      }
    } catch (error) {
      message.error("Login failed. Please try again later.");
    }
  };

  return (
    <Row justify="center" align="middle">
      <Col xs={20} sm={16} md={12} lg={8}>
        <h2 style={{ textAlign: 'center' }}>Log in</h2>
        <Form form={form} onFinish={onFinish}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input username' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input password' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Log in
            </Button>
          </Form.Item>
        </Form>
        <div style={{ textAlign: 'center' }}>
          <span>Don’t have an account? </span>
          <a style={{ marginLeft: '8px' }} onClick={() => router.push('/signup')}>
          Sign up
          </a>
        </div>
      </Col>
    </Row>
  );
};

export default LoginForm;