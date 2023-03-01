import React, { useState } from 'react';
import { Button, Form, Input, Radio } from 'antd';
import AddImage from './components/AddImage';
import AddSensors from './components/AddSensors';
import AddAssignedUserIds from './components/AddAssignedUserIds';
type LayoutType = Parameters<typeof Form>[0]['layout'];

const AssetsAddAssetForm = () => {
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  return (
    <Form
      layout={'vertical'}
      form={form}
      initialValues={{ layout: 'vertical' }}
      onValuesChange={() => {}}
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
    >
      <Form.Item label="Image of Asset" name="image">
        <AddImage setImageValue={(image: any) => form.setFieldValue('image', image)}/>
      </Form.Item>
      <Form.Item label="Model" name="model">
        <Input placeholder="motor, fan, dryer..." />
      </Form.Item>
      <Form.Item label="Name" name="name">
        <Input placeholder="Motor H13D-1" />
      </Form.Item>
      <Form.Item label="Sensors" name="sensors">
        <AddSensors setFormSensorsValue={(sensors: string[]) => form.setFieldValue('sensors', sensors)}/>
      </Form.Item>
      <Form.Item label="Assigned Users" name="assignedusersids">
        <AddAssignedUserIds />
      </Form.Item>
      <Form.Item>
        <Button style={{float: 'right'}} type="primary" htmlType="submit">Add Asset!</Button>
      </Form.Item>
    </Form>
  );
};

export default AssetsAddAssetForm;