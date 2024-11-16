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
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '@/components/AuthContext';

const { Header, Content, Footer } = AntdLayout;
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
        label: "Home",
        key: "",
    },
    {
        //icon: React.createElement(icon),
        label: "Recipe",
        key: "recipe",
    },
    {
        //icon: React.createElement(icon),
        label: "About",
        key: "about",
    },

]

const user_items: MenuProps['items'] = [
    {
        key: '1',
        label: "My Page",
    },
    {
        key: '2',
        danger: true,
        label: 'Logout',
    },
];


export function Layout({ children }: { children: ReactNode }) {
    const router = useRouter();
    const MenuClick: MenuProps["onClick"] = ({ key }) => {
      router.push(`/${key}`);
    }
    const { isLoggedIn, logout } = useAuth();

    const onUserMenuClick: MenuProps["onClick"] = ({ key }) => {
      if (key === '1') {
        router.push(`/mypage`);
      }
        if (key === '2') {
          logout();
        }
      };

      return (
        <>
          <Head>
            <title>Cocktail Recipes</title>
            <meta name="description" content="Generated by create next app" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <main>
            <AntdLayout className={styles.sectionInner}>
              <AntdLayout>
                <Header className={styles.header}>
                  <Link href="/">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Image src="/logo.jpg" width={20} height={20} alt="logo" className={styles.logo} />
                      <span className={styles.logoFont}>Cocktail Recipes</span>
                    </div>
                  </Link>
                  <Menu
                    className={styles.menu}
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    items={ITEMS}
                    onClick={MenuClick}
                    style={{ flex: 1, minWidth: 0 ,display:'flex',justifyContent:'center',fontSize: '18px'}}
                  />
                  <span className={styles.user}>
                    {isLoggedIn ? (
                      <Dropdown menu={{ items: user_items, onClick: onUserMenuClick }}>
                        <a onClick={(e) => e.preventDefault()}>
                          <Space>User <DownOutlined /></Space>
                        </a>
                      </Dropdown>
                    ) : (
                      <Link href="/login">Log in</Link>
                    )}
                  </span>
                </Header>
                <AntdLayout className={styles.sectionContent}>
                  <Content className={styles.content}>
                    {children}
                  </Content>
                </AntdLayout>
                <Footer style={{ textAlign: 'center' }}>
                  Created by KaguraMio
                </Footer>
              </AntdLayout>
            </AntdLayout>
          </main>
        </>
      );
    }