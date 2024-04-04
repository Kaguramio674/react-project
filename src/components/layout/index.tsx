import React, { ReactNode } from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout as AntdLayout, Menu, theme, Dropdown, Space } from 'antd';
import Image from 'next/image';
import styles from './index.module.css';
import { useRouter } from 'next/router';
import { DownOutlined } from '@ant-design/icons';
import Head from 'next/head';
import { Inter } from 'next/font/google';

const { Header, Content, Sider } = AntdLayout;
const inter = Inter({ subsets: ['latin'] });

const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
    key,
    label: `nav ${key}`,
}));

const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
    (icon, index) => {
        const key = String(index + 1);

        return {
            key: `sub${key}`,
            icon: React.createElement(icon),
            label: `subnav ${key}`,

            children: new Array(4).fill(null).map((_, j) => {
                const subKey = index * 4 + j + 1;
                return {
                    key: subKey,
                    label: `option${subKey}`,
                };
            }),
        };
    },
);
const ITEMS = [
    {
        //icon: React.createElement(icon),
        label: "图书",
        key: "book",

        children: [{
            label: "图书一览",
            key: "/book"
        }, {
            label: "图书添加",
            key: "/book/add"
        }]
    },
    {
        //icon: React.createElement(icon),
        label: "借阅管理",
        key: "borrow",

        children: [{
            label: "借阅一览",
            key: "/borrow"
        }, {
            label: "借阅添加",
            key: "/borrow/add"
        }]
    },
    {
        //icon: React.createElement(icon),
        label: "分类管理",
        key: "category",

        children: [{
            label: "分类一览",
            key: "/category"
        }, {
            label: "分类添加",
            key: "/category/add"
        }]
    },
    {
        //icon: React.createElement(icon),
        label: "用户管理",
        key: "user",

        children: [{
            label: "用户一览",
            key: "/user"
        }, {
            label: "用户添加",
            key: "/user/add"
        }]
    }
]

const user_items: MenuProps['items'] = [
    {
        key: '1',
        label: "My Page",
    },
    {
        key: '2',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                2nd menu item (disabled)
            </a>
        ),
        //icon: <SmileOutlined />,
        disabled: true,
    },
    {
        key: '3',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                3rd menu item (disabled)
            </a>
        ),
        disabled: true,
    },
    {
        key: '4',
        danger: true,
        label: 'Logout',
    },
];


export function Layout({ children }:{children:ReactNode}) {
    const router = useRouter();
    const MenuClick: MenuProps["onClick"] = ({ key }) => {
        router.push(key);
    }
    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <AntdLayout className={styles.sectionInner}>
                    <Header className={styles.header}>
                        <Image src="/logo.jpg" width={20} height={20} alt="logo" className={styles.logo} />
                        test logo
                        <span className={styles.user}>
                            <Dropdown menu={{ items: user_items }}>

                                <a onClick={(e) => e.preventDefault()}><Space>User <DownOutlined /> </Space>  </a>

                            </Dropdown>
                        </span>

                    </Header>
                    <AntdLayout>
                        <Sider width={200}>
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['/book']}
                                defaultOpenKeys={['sub1']}
                                style={{ height: '100%', borderRight: 0 }}
                                items={ITEMS}
                                onClick={MenuClick}
                            />
                        </Sider>
                        <AntdLayout className = {styles.sectionContent}>
                            <Content className = {styles.content}>
                                {children}
                            </Content>
                        </AntdLayout>
                    </AntdLayout>
                </AntdLayout>
            </main>


        </>
    );
}