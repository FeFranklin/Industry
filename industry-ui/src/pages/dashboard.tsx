import React from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import styles from '@/styles/Home.module.css'
import Assets from '@/components/Assets/Assets';

const { Header, Content, Footer } = Layout;
const items = ['Assets', 'Companies', 'Units', 'Users', 'Workorders']

const items1: MenuProps['items'] = items.map((key) => ({
  key,
  label: key,
}));

const dashboard = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <main className={styles.main}>
      <Layout>
        <Header className="header">
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['Assets']} items={items1} />
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Layout style={{ padding: '24px 0', background: colorBgContainer, margin: '3.125rem 0 0 0' }}>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
            <Assets />
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </main>
  );
};

export default dashboard;