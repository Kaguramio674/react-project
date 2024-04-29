import { Button, Col, Form, Input, Row, Select, Card, Avatar, Pagination, Layout } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from './index.module.css'
import { getBookList } from "@/api/book";
import { BookQueryType } from "@/type";
import { SearchOutlined, StarOutlined, LikeOutlined } from '@ant-design/icons';

const { Meta } = Card;
const { Sider, Content } = Layout;

export default function Home() {
  const [form] = Form.useForm();
  const router = useRouter()
  const [data, setData] = useState([])
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 12,
    total: 0
  })

  useEffect(() => {
    async function fetchData() {
      const res = await getBookList({ current: pagination.current, pageSize: pagination.pageSize })
      setData(res.data)
      setPagination({ ...pagination, total: res.total })
    }
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.current, pagination.pageSize])

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
  const [descriptionLength, setDescriptionLength] = useState(50);

  useEffect(() => {
    const handleResize = () => {
      const cardWidth = document.querySelector('.ant-card')?.offsetWidth || 300;
      const newLength = Math.floor(cardWidth / 7); // 根据卡片宽度计算描述长度
      setDescriptionLength(newLength);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // 初始化时计算一次描述长度

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handlePageChange = (page: number, pageSize: number) => {
    setPagination({ ...pagination, current: page, pageSize });
  };


  return (
    <Layout>
      <Sider width={300} theme="light">
        <Form
          form={form}
          name="search"
          onFinish={handelSearchFinish}
          initialValues={{
            name: '',
            author: '',
            category: '',
          }}
          layout="vertical"
        >
          <Form.Item name="name" label="Name">
            <Input placeholder="Name" allowClear />
          </Form.Item>
          <Form.Item name="author" label="Author">
            <Input placeholder="Author" allowClear />
          </Form.Item>
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
          <Form.Item>
            <Button type="primary" icon={<SearchOutlined />} htmlType="submit">
              Search
            </Button>
            <Button type="dashed" htmlType="submit" onClick={handelreset}>
              Clear
            </Button>
          </Form.Item>
        </Form>
      </Sider>
      <Content>
        <div className={styles.cardWrap}>
          <Row gutter={[16, 16]}>
            {data.map((item: any) => (
              <Col key={item.id} xs={24} sm={12} md={8}>
                <Card
                  hoverable
                  style={{  }}
                  cover={<img alt={item.name} src={item.cover} />}
                  actions={[
                    <LikeOutlined key="like" />,
                    <StarOutlined key="star" />,
                  ]}
                >
                  <Meta
                    title={item.name}
                    description={
                      item.description.length > descriptionLength
                        ? `${item.description.slice(0, descriptionLength)}...`
                        : item.description
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </div>
        <div className={styles.paginationWrap}>
          <Pagination
            current={pagination.current}
            pageSize={pagination.pageSize}
            total={pagination.total}
            showSizeChanger
            showQuickJumper
            showTotal={(total) => `Total ${total} items`}
            onChange={handlePageChange}
            onShowSizeChange={handlePageChange}
            pageSizeOptions={['12', '24', '48']}
          />
        </div>
      </Content>
    </Layout>
  );
}