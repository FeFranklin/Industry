import React from 'react'
import { Col, Row, Layout, Space, Typography } from 'antd'
import LoginForm from './LoginForm'
const { Content } = Layout
const { Title, Text } = Typography

export const Login = () => {
  return (
    <Row
      gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
      style={{ width: '100%', height: '100%', padding: '2rem' }}
      align="middle"
      wrap={false}
    >
      <Col span={24}>
        <Row justify="start">
          <Title level={2}>Industries</Title>
        </Row>
        <Row align="middle">
          <Col span={24}>
            <Row justify="center">
              <Space
                direction="vertical"
                size="middle"
                style={{ display: 'flex' }}
              >
                <Title level={4}>Sing Up</Title>
                <Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                  volutpat odio vitae velit mollis, sed tristique nibh interdum.
                  Mauris sodales tempor arcu non vehicula. Sed suscipit orci
                  quis dui pretium malesuada.
                </Text>
                <LoginForm />
              </Space>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}
