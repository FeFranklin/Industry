import React, { useState } from 'react';
import { Button, Form, Input, Radio } from 'antd';

type LayoutType = Parameters<typeof Form>[0]['layout'];

const AssetsAddAssetForm = () => {
  const [form] = Form.useForm();

  return (
    <Form
      layout={'vertical'}
      form={form}
      initialValues={{ layout: 'vertical' }}
      onValuesChange={() => console.log('lul')}
      style={{ maxWidth: 600 }}
    >
      <Form.Item label="Field A">
        <Input placeholder="input placeholder" />
      </Form.Item>
      <Form.Item label="Field B">
        <Input placeholder="input placeholder" />
      </Form.Item>
      <Form.Item>
        <Button style={{float: 'right'}} type="primary">Add Asset!</Button>
      </Form.Item>
    </Form>
  );
};

export default AssetsAddAssetForm;