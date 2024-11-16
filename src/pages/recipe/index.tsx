import { Button, Col, Form, Input, Row, Select, Card, Avatar, Pagination, Layout, Checkbox, CheckboxProps, Divider, GetProp, Typography, ConfigProvider } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from './index.module.css'
import { getRecipeList } from "@/api/recipe";
import { RecipeQueryType } from "@/type";
import { SearchOutlined, StarOutlined, StarFilled, LikeOutlined, LikeFilled } from '@ant-design/icons';
import { TinyColor } from '@ctrl/tinycolor';
//import { CheckboxValueType } from "antd/es/checkbox/Group";
import { useAuth } from '@/components/AuthContext';

const { Meta } = Card;
const { Sider, Content } = Layout;

type CheckboxValueType = GetProp<typeof Checkbox.Group, 'value'>[number];
const CheckboxGroup = Checkbox.Group;
const plainOptions = ['Alcohol-free', 'Light(1~10%)', 'Medium(11~19%)', 'Strong(20~40%)'];
const defaultCheckedList = ['Alcohol-free', 'Light(1~10%)', 'Medium(11~19%)', 'Strong(20~40%)'];

 //button color
 const colors3 = ['#40e495', '#30dd8a', '#2bb673'];
 const getHoverColors = (colors: string[]) =>
   colors.map((color) => new TinyColor(color).lighten(5).toString());
 const getActiveColors = (colors: string[]) =>
   colors.map((color) => new TinyColor(color).darken(5).toString());
 
 


export default function Home() {
  const [form] = Form.useForm();
  const router = useRouter()
  const [data, setData] = useState([])
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 12,
    total: 0
  })
  const [sortBy, setSortBy] = useState('default');
  const { isLoggedIn, user } = useAuth();


  useEffect(() => {
    async function fetchData() {
      const res = await getRecipeList({ current: pagination.current, pageSize: pagination.pageSize, sortBy });
      setData(res.data);
      setPagination({ ...pagination, total: res.total });
    }
    fetchData();
  }, [pagination.current, pagination.pageSize, sortBy]);

  const handelSearchFinish = async (values: RecipeQueryType) => {
    const formValues = { ...values, alcohol: checkedList };
    const res = await getRecipeList({ ...formValues, current: 1, pageSize: pagination.pageSize, sortBy });
    setData(res.data);
    setPagination({ ...pagination, current: 1, total: res.total });
  };

  const handelreset = () => {
    form.resetFields();
    setCheckedList(defaultCheckedList);
  };

  const handleRecipeEdit = () => {
    router.push('/recipes/edit/id')
  };
  const [descriptionLength, setDescriptionLength] = useState(50);

  useEffect(() => {
    const handleResize = () => {
      const cardWidth = (document.querySelector('.ant-card') as HTMLElement)?.offsetWidth || 300;
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

  // 多选框
  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>(defaultCheckedList);
  const checkAll = plainOptions.length === checkedList.length;
  const indeterminate = checkedList.length > 0 && checkedList.length < plainOptions.length;
  const onChange = (list: CheckboxValueType[]) => {
    setCheckedList(list);
  };
  const onCheckAllChange: CheckboxProps['onChange'] = (e) => {
    setCheckedList(e.target.checked ? plainOptions : []);
  };

  const [spiritValue, setSpiritValue] = useState<string[]>([]);
  const onFormValuesChange = (changedValues: any, allValues: any) => {
    if (changedValues.spirit) {
      setSpiritValue(changedValues.spirit);
    }
  };
  const handelClick = () => {
    router.push('/recipe/add')
  }

  // 判断用户是否喜欢或收藏了某个食谱
  const isRecipeLiked = (recipeId: string) => {
    return user && user.liked ? user.liked.split(',').includes(recipeId) : false;
  };

  const isRecipeStarred = (recipeId: string) => {
    return user && user.stared ? user.stared.split(',').includes(recipeId) : false;
  };

  return (
    <Layout>
      <Sider width={300} theme="light">

        <Form
          form={form}
          name="search"
          onFinish={handelSearchFinish}
          onValuesChange={onFormValuesChange}
          initialValues={{
            name: '',
            author: '',
            alcohol: '',
          }}
          layout="vertical"
        >
          <Form.Item name="name" label="Name">
            <Input placeholder="Name" allowClear />
          </Form.Item>
          <Form.Item name="spirit" label="Spirit" initialValue={[]}>
            <Row gutter={[16, 16]}>
              {['Gin', 'Whisky', 'Brandy', 'Vodka', 'Rum', 'Tequila'].map((spirit) => (
                <Col key={spirit} span={8}>
                  <Card
                    hoverable
                    cover={
                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', height: 150 }}>
                        <img alt={spirit}
                          src={`/recipes/base/${spirit.toLowerCase()}.jpg`}
                          style={{ maxWidth: '100%', maxHeight: '100%' }} />
                      </div>
                    }
                    bodyStyle={{ padding: '8px', marginTop: '-30px' }}
                    onClick={() => {
                      const newSpiritValue = spiritValue.includes(spirit)
                        ? spiritValue.filter((item) => item !== spirit)
                        : [...spiritValue, spirit];
                      setSpiritValue(newSpiritValue);
                      form.setFieldsValue({ spirit: newSpiritValue });
                    }}
                    style={{
                      border: spiritValue.includes(spirit)
                        ? '2px solid #1890ff'
                        : '1px solid #d9d9d9'
                    }}
                  >
                    <Card.Meta
                      title={
                        <Typography.Text
                          style={{
                            width: '100%',
                            display: 'block',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            textAlign: 'center',
                          }}
                        >
                          {spirit}
                        </Typography.Text>
                      }
                    />
                  </Card>
                </Col>
              ))}
            </Row>
          </Form.Item>
          <Form.Item name="alcohol" label="Alc.">
            <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
              Check all
            </Checkbox>

            <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChange} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" icon={<SearchOutlined />} htmlType="submit">
              Search
            </Button>
            <Button type="dashed" htmlType="submit" onClick={handelreset}>
              Clear
            </Button>
          </Form.Item>
          <Form.Item style={{ textAlign: 'center' }} >
          <b>Can not find what you want?</b>
          <ConfigProvider
      theme={{
        components: {
          Button: {
            colorPrimary: `linear-gradient(116deg,  ${colors3.join(', ')})`,
            colorPrimaryHover: `linear-gradient(116deg, ${getHoverColors(
              colors3
            ).join(', ')})`,
            colorPrimaryActive: `linear-gradient(116deg, ${getActiveColors(
              colors3
            ).join(', ')})`,
            lineWidth: 0,
          },
        },
      }}
    >
      <Button type="primary" size="large" onClick = {handelClick}>
         Creat your own recipe!
      </Button>
    </ConfigProvider>
            </Form.Item>
        </Form>
      </Sider>
      <Content>
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '16px' }}>
          Sort by : &nbsp;
          <Select value={sortBy} onChange={(value) => setSortBy(value)} style={{ width: 120 }}>
            <Select.Option value="default">Default</Select.Option>
            <Select.Option value="createdAt">Created Time</Select.Option>
            <Select.Option value="likeCount">Likes</Select.Option>
            <Select.Option value="starCount">Stars</Select.Option>
          </Select>
        </div>
        <div className={styles.cardWrap}>
          <Row gutter={[16, 16]}>
            {data.map((item: any) => (
              <Col key={item.id} xs={24} sm={12} md={8}>
                <Card
                  hoverable
                  style={{ textAlign: 'center' }}
                  cover={<img alt={item.name} src={item.imageUrl} style={{width: '120px', height: 'auto', maxHeight: '150px', margin: '0 auto'  }}/>}
                  actions={[
                    <span key="like">
                      {isRecipeLiked(item.id.toString()) ? (
                        <LikeFilled style={{ color: 'red' }} />
                      ) : (
                        <LikeOutlined />
                      )} <b style={{ color: 'red' }}>{item.likeCount}</b>
                    </span>,
                    <span key="star">
                      {isRecipeStarred(item.id.toString()) ? (
                        <StarFilled style={{ color: 'orange' }} />
                      ) : (
                        <StarOutlined />
                      )} <b style={{ color: 'orange' }}>{item.starCount}</b>
                    </span>,
                  ]}
                  onClick={() => router.push(`/recipe/${item.id}`)}
                >
                  <Meta
                    title={item.name}
                    description={item.alcohol}
                  />
                  <Meta
                    description={!item.spirit || item.spirit.length === 0 ? item.basic : item.spirit}
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