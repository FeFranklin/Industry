import React, { useState } from 'react'
import type { MenuProps } from 'antd'
import { Layout, Menu, theme } from 'antd'
// import styles from '@/styles/Home.module.css'
import Assets from '@/components/Assets/Assets'
import Companies from '@/components/Companies/Companies'
import Units from '@/components/Units/Units'
import Users from '@/components/Users/Users'
import Workorders from '@/components/Workorders/Workorders'
import styles from '@/styles/Dashboard.module.scss'

const { Header, Content, Footer } = Layout
const items = ['Assets', 'Companies', 'Units', 'Users', 'Workorders']

const items1: MenuProps['items'] = items.map((key) => ({
  key,
  label: key,
}))

const Dashboard = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken()
  const [selectedPage, setSelectedPage] = useState<string>('Assets')
  const onChangeView = (itemKey: string) => setSelectedPage(itemKey)

  return (
    <main className={styles.main}>
      <Layout>
        <Header className="header">
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={[selectedPage]}
            items={items1}
            onClick={({ key }) => onChangeView(key)}
          />
        </Header>
        <Content className={styles.contentContainer}>
          <Layout
            className={styles.layout}
            style={{ background: colorBgContainer }}
          >
            <Content className={styles.innerContent}>
              {selectedPage === 'Assets' && <Assets />}
              {selectedPage === 'Companies' && <Companies />}
              {selectedPage === 'Units' && <Units />}
              {selectedPage === 'Users' && <Users />}
              {selectedPage === 'Workorders' && <Workorders />}
            </Content>
          </Layout>
        </Content>
        <Footer className={styles.footer}>
          ©2023 Created by Felipe Franklin
        </Footer>
      </Layout>
    </main>
  )
}

export default Dashboard
