import Head from 'next/head';
import router, { useRouter } from 'next/router';
import { Button, Flex, Form, Input, Rate, Select, Space, Spin, Upload, message } from 'antd';
import { PlusOutlined, UploadOutlined, MinusCircleOutlined, ExperimentOutlined } from '@ant-design/icons';
import { Inter } from 'next/font/google';
import { useEffect, useState } from 'react';
import { imageupload } from '@/api/upload';
import { createRecipe } from '@/api/recipe';
import { useAuth } from '@/components/AuthContext';

const inter = Inter({ subsets: ['latin'] });

const { Option } = Select;

const SpiritsOptions = ['Gin', 'Vodka', 'Rum', 'Tequila', 'Brandy', 'Whisky'];

const BasicsOptions = ['Cointreau', 'Blue Curacao', 'Campari', 'Sweet Vermouth', 'Dry Vermouth', 'Angostura Bitters', 'Champagne',
  'Kahlua Coffee Liqueur','Cherry Liqueur','Benedictine D.O.M.','Amaretto'
];
const JuicesOptions = {
  Beverages: ['Tonic Water', 'Club Soda', 'Cola', 'Lemonade', 'Iced Tea', 'Milk', 'Coffee',  'Ginger Beer'],
  Syrups: ['Simple Syrup', 'Grenadine', 'Orgeat', 'Honey', 'Maple Syrup', 'Agave Syrup', 'Caramel Syrup', 'Vanilla Syrup', 'Mint Syrup'],
  Juices: ['Lemon Juice', 'Lime Juice', 'Orange Juice', 'Grapefruit Juice', 'Pineapple Juice', 'Cranberry Juice','Tomato Juice'],
};




const { TextArea } = Input;

const RecipeCreate = () => {
  const router = useRouter();
  const [form] = Form.useForm();

//auth
const { isLoggedIn } = useAuth();
const [hasRedirected, setHasRedirected] = useState(false);

useEffect(() => {
  if (!isLoggedIn && !hasRedirected) {
    setHasRedirected(true);
    router.replace('/login');
  }
}, [isLoggedIn, hasRedirected, router]);


  const onFinish = async (values: any) => {
    if (selectedFile) {
      console.log('1 image');
    }
    else {
      console.log('No image');
    }
    console.log(values);
    if ((!values.spirits || values.spirits.length === 0)&&(!values.basics || values.basics.length === 0)&&(!values.juices || values.juices.length === 0)&&(!values.others || values.others.length === 0)) {
      message.error('At least one base is required');
      return;
    }
    if (value === 0) {
      message.error('Please select Alcohol Percentage');
      return;
    }
    values.alcohol = alcoholDesc[value - 1];
    //console.log('Received values of form: ', values);
    // Upload file
    if (selectedFile) {// Have image
      setUploading(true);
      try {
        const image_response = await imageupload(selectedFile);
        values.imageurl = image_response.url;
        const { image, ...values_ } = values;
        console.log(values_);
        try {
          const response = await createRecipe(values_);
          message.success('Recipe created successfully');
          router.push('/recipe');
        } catch (error) {
          message.error('Recipe creation failed');
        }

      } catch (error) {
        message.error('Image upload failed');
      } finally {
        setUploading(false);
      }
    }
    else { //No image
      values.imageurl = "https://cocktail-react-project.s3.ap-northeast-1.amazonaws.com/public/recipe-img/1718202377235-default.png";
      const { image, ...values_ } = values;
      console.log(values_);
      try {
        const response = await createRecipe(values_);
        message.success('Recipe created successfully');
        router.push('/recipe');
      } catch (error) {
        message.error('Recipe creation failed');
      }
    }
  };
  //upload file
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const validFileTypes = ['image/jpg', 'image/jpeg', 'image/png'];
  const beforeUpload = (file: File) => {
    setSelectedFile(file);
    return false;
  }
  const [uploading, setUploading] = useState(false);



  // const addBase = () => {
  //   setBases([...bases, { base: undefined, amount: undefined }]);
  // };
  const alcoholDesc = ['Alcohol-free', 'Light(1~10%)', 'Medium(11~19%)', 'Strong(20~40%)'];
  const [value, setValue] = useState(0);
  const { Option, OptGroup } = Select;

  return (
    <>
      <Head>
        <title>Create Recipe</title>
      </Head>
      <h1 className={inter.className} style={{ textAlign: 'center' }}>Recipe Create</h1>
      <Form form={form} name="create-recipe" onFinish={onFinish}>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please enter recipe name' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="image"
          label="Image"
          valuePropName="fileList"
          getValueFromEvent={(e: any) => e && e.fileList}
        >
          <Upload name="image" accept={validFileTypes.join(',')} listType="picture-card"
            beforeUpload={beforeUpload} maxCount={1}>
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>

          </Upload>
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: 'Please enter description' }]}
        >
          <TextArea rows={4} />
        </Form.Item>
        Spirits:
        <Form.List name="spirits">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }, index) => (
                <Space key={key} style={{ display: 'flex', marginBottom: -25 }} align="baseline" >
                  <Form.Item {...restField} label={`spirits ${index + 1}`}>
                    <Space>
                      <Form.Item
                        {...restField}
                        name={[name, 'spirits']}
                        rules={[{ required: true, message: 'Missing Spirit' }]}
                        style={{ width: '120px' }}
                      >
                        <Select placeholder="spirit">
                          {SpiritsOptions.map(spirit => (
                            <Option key={spirit} value={spirit}>{spirit}</Option>
                          ))}
                        </Select>
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'amount']}
                        rules={[{ required: true, message: 'Missing amount' }]}
                      >
                        <Input placeholder="Amount" style={{ width: '80px' }} />
                      </Form.Item>
                    </Space>
                  </Form.Item>
                  ml
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Add Spirit
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        Liqueurs:
        <Form.List name="basics">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }, index) => (
                <Space key={key} style={{ display: 'flex', marginBottom: -25 }} align="baseline" >
                  <Form.Item {...restField} label={`basics ${index + 1}`}>
                    <Space>
                      <Form.Item
                        {...restField}
                        name={[name, 'basics']}
                        rules={[{ required: true, message: 'Missing Liqueur' }]}
                        style={{ width: '180px' }}
                      >
                        <Select placeholder="Liqueur">
                          {BasicsOptions.map(basic => (
                            <Option key={basic} value={basic}>{basic}</Option>
                          ))}
                        </Select>
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'amount']}
                        rules={[{ required: true, message: 'Missing amount' }]}
                      >
                        <Input placeholder="Amount" style={{ width: '80px' }} />
                      </Form.Item>
                    </Space>
                  </Form.Item>
                  ml
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Add Liqueur
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        Beverages & Syrups & Juices:
        <Form.List name="juices">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }, index) => (
                <Space key={key} style={{ display: 'flex', marginBottom: -25 }} align="baseline" >
                  <Form.Item {...restField} label={`juices ${index + 1}`}>
                    <Space>
                      <Form.Item
                        {...restField}
                        name={[name, 'juices']}
                        rules={[{ required: true, message: 'Missing Juice' }]}
                        style={{ width: '150px' }}
                      >
                        <Select placeholder="">
                          {Object.entries(JuicesOptions).map(([group, options]) => (
                            <OptGroup key={group} label={group}>
                              {options.map(option => (
                                <Option key={option} value={option}>
                                  {option}
                                </Option>
                              ))}
                            </OptGroup>
                          ))}
                        </Select>
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'amount']}
                      >
                        <Input placeholder="Amount" style={{ width: '80px' }} />
                      </Form.Item>
                    </Space>
                  </Form.Item>
                  ml
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Add Juice
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        Others:
        <Form.List name="others">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }, index) => (
                <Space key={key} style={{ display: 'flex', marginBottom: -25 }} align="baseline" >
                  <Form.Item {...restField} label={`others ${index + 1}`}>
                    <Space>
                      <Form.Item
                        {...restField}
                        name={[name, 'others']}
                        rules={[{ required: true, message: 'Missing Juice' }]}
                        style={{ width: '150px' }}
                      >
                        <Input placeholder="item" style={{ width: '130px' }} />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'amount']}
                      >
                        <Input placeholder="Unit & Amount" style={{ width: '100px' }} />
                      </Form.Item>
                    </Space>
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Add Juice
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item name="alcohol" label="Alcohol Percentage">
          <Flex align="middle">
            <Rate character={<ExperimentOutlined />} tooltips={alcoholDesc} onChange={setValue} value={value} count={4} />
            {value ? <span style={{ marginLeft: '16px' }}>{alcoholDesc[value - 1]}</span> : null}
          </Flex>
        </Form.Item>
        <Form.Item
          name="method"
          label="Method"
          rules={[{ required: true, message: 'Please enter method' }]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
          <Button type="primary" htmlType="submit" disabled={uploading}>
            {uploading ? <Spin /> : 'Create Recipe'}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default RecipeCreate;