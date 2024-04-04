import { Button, Col, Flex, Form, Input, Row, Select } from 'antd';

import { SearchOutlined } from '@ant-design/icons';

export default function Home() {
  const [form] = Form.useForm()
  const handelSearchFinish = (values) => {
    console.log(values);
  }
  const handelreset = () => {
    form.resetFields()
  }
  return (
    <>
      <Form
        form={form}
        name="search"
        onFinish={handelSearchFinish}
        initialValues={
          { name: "", author: "", category: "" }
        }
      >
        <Row gutter={30} align="top">
          <Col span={6}>
            <Form.Item name="name" label="Name">
              <Input placeholder="Name" allowClear />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item name="author" label="Auther">
              <Input placeholder="Auther" allowClear />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item name="category" label="Category">
              <Select
                allowClear
                placeholder="Select a category"
                options={[
                  {
                    label: <span>manager</span>,
                    title: 'manager',
                    options: [
                      { label: <span>Jack</span>, value: 'Jack' },
                      { label: <span>Lucy</span>, value: 'Lucy' },
                    ],
                  },
                  {
                    label: <span>engineer</span>,
                    title: 'engineer',
                    options: [
                      { label: <span>Chloe</span>, value: 'Chloe' },
                      { label: <span>Lucas</span>, value: 'Lucas' },
                    ],
                  },
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item>
              <Flex wrap="wrap" gap="small">
                <Button type="primary" icon={<SearchOutlined />} htmlType="submit">
                  Search
                </Button>
                <Button type="dashed" htmlType="submit" onClick={handelreset}>
                  Clear
                </Button>
              </Flex>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
}
