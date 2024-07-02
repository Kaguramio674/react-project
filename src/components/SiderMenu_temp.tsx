import { Button, Col, Form, Input, Row, Card, Checkbox, Typography } from "antd";
import { useEffect, useState } from "react";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { SearchOutlined } from '@ant-design/icons';

const { Group: CheckboxGroup } = Checkbox;
const plainOptions = ['Alcohol-free', 'Light(1~10%)', 'Medium(11~19%)', 'Strong(20~40%)'];
const defaultCheckedList = ['Alcohol-free', 'Light(1~10%)', 'Medium(11~19%)', 'Strong(20~40%)'];

interface SiderMenuProps {
  onSearch: (values: any) => void;
}

const SiderMenu = ({ onSearch }: SiderMenuProps) => {
  const [form] = Form.useForm();
  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>(defaultCheckedList);
  const [baseValue, setBaseValue] = useState<string[]>([]);

  const checkAll = plainOptions.length === checkedList.length;
  const indeterminate = checkedList.length > 0 && checkedList.length < plainOptions.length;

  const onChange = (list: CheckboxValueType[]) => {
    setCheckedList(list);
  };

  const onCheckAllChange = (e: any) => {
    setCheckedList(e.target.checked ? plainOptions : []);
  };

  const onFormValuesChange = (changedValues: any, allValues: any) => {
    if (changedValues.base) {
      setBaseValue(changedValues.base);
    }
  };

  const handelSearchFinish = async (values: any) => {
    const formValues = { ...values, alcohol: checkedList };
    onSearch(formValues);
  };

  const handelReset = () => {
    form.resetFields();
    setCheckedList(defaultCheckedList);
  };

  return (
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
      <Form.Item name="base" label="Base" initialValue={[]}>
        <Row gutter={[16, 16]}>
          {['Gin', 'Whisky', 'Brandy', 'Vodka', 'Rum', 'Tequila'].map((base) => (
            <Col key={base} span={8}>
              <Card
                hoverable
                cover={
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', height: 150 }}>
                    <img alt={base}
                      src={`/recipes/base/${base.toLowerCase()}.jpg`}
                      style={{ maxWidth: '100%', maxHeight: '100%' }} />
                  </div>
                }
                bodyStyle={{ padding: '8px', marginTop: '-30px' }}
                onClick={() => {
                  const newBaseValue = baseValue.includes(base)
                    ? baseValue.filter((item) => item !== base)
                    : [...baseValue, base];
                  setBaseValue(newBaseValue);
                  form.setFieldsValue({ base: newBaseValue });
                }}
                style={{
                  border: baseValue.includes(base)
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
                      {base}
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
        <Button type="dashed" htmlType="submit" onClick={handelReset}>
          Clear
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SiderMenu;