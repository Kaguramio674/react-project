import { Button, Col, Flex, Form, Image, Input, Row, Select, Space, Table, TablePaginationConfig, Tooltip } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import dayjs from 'dayjs'
import styles from './index.module.css'
import { getBookList } from "@/api/book";
import { BookQueryType } from "@/type";
import { SearchOutlined } from '@ant-design/icons';


const COLUMNS = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    width: 200
  },
  {
    title: '封面',
    dataIndex: 'cover',
    key: 'cover',
    width: 120,
    render: (text: string) => {
      return <Image
        width={50}
        src={text}
        alt=""
      />
    }
  },
  {
    title: '作者',
    dataIndex: 'author',
    key: 'author',
    width: 120
  },
  {
    title: '分类',
    dataIndex: 'category',
    key: 'category',
    width: 80
  },
  {
    title: '描述',
    dataIndex: 'description',
    key: 'description',
    ellipsis: true,
    width: 200,
    render: (text: string) => {
      return <Tooltip title={text} placement="topLeft">
        {text}
      </Tooltip>
    }
  },
  {
    title: '库存',
    dataIndex: 'stock',
    key: 'stock',
    width: 80
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: 130,
    render: (text: string) => dayjs(text).format('YYYY-MM-DD')
  },
];

export default function Home() {
  const [form] = Form.useForm();
  const router = useRouter()
  const [data, setData] = useState([])
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 20,
    showSizeChanger: true,
    total: 0
  })
  useEffect(() => {
    async function fetchData() {
      const res = await getBookList({ current: 1, pageSize: pagination.pageSize })
      const { data } = res
      setData(data)
    }
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const handelSearchFinish = async (values: BookQueryType) => {
    const res = await getBookList({ ...values, current: 1, pageSize: pagination.pageSize })
    setData(res.data)
    setPagination({ ...pagination, current: 1, total: res.total })
  };

  const handelreset = () => {
    form.resetFields();
  };
  const handleBookEdit = () => {
    router.push('/book/edit/id')
  };
  const handleTableChange = (pagination: TablePaginationConfig) => {
    setPagination(pagination)
    const query = form.getFieldsValue()
    getBookList({
      current: pagination.current,
      pageSize: pagination.pageSize,
      ...query
    })
  }

  const columns = [...COLUMNS,
  {
    title: '操作', key: "action", render: (_: any, row: any) => {
      return <Space>
        <Button type="link" onClick={handleBookEdit}> 编辑</Button>
        <Button type="link" danger>删除</Button>
      </Space>
    }
  }
  ]

  return (
    <>
      <Form
        form={form}
        name="search"
        onFinish={handelSearchFinish}
        initialValues={{
          name: '',
          author: '',
          category: '',
        }}
      >
        <Row gutter={[10, 0]} align="top">
          <Col xs={30} sm={24} md={12} lg={6}>
            <Form.Item name="name" label="Name">
              <Input placeholder="Name" allowClear />
            </Form.Item>
          </Col>
          <Col xs={30} sm={24} md={12} lg={6}>
            <Form.Item name="author" label="Auther">
              <Input placeholder="Auther" allowClear />
            </Form.Item>
          </Col>
          <Col xs={30} sm={24} md={12} lg={6}>
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
          <Col xs={24} sm={24} md={12} lg={6}>
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
      <div className={styles.tableWrap}>
      <Table
        dataSource={data}
        columns={columns}
        scroll={{ x: 1000 }}
        onChange={handleTableChange}
        pagination={{ ...pagination, showTotal: () => `共 ${pagination.total} 条` }}
      />
    </div>
    </>
  );
}