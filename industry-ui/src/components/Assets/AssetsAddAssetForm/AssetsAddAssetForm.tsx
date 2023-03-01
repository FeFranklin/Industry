import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import AddImage from './components/AddImage';
import AddSensors from './components/AddSensors';
import AddAssignedUserIds from './components/AddAssignedUserIds';
import AddAssinedUnitId from './components/AddAssignedUnitId';
import AddAssignedCompanyId from './components/AddAssignedCompanyId';

const AssetsAddAssetForm = ({ onCancel, openAddNotification }: { onCancel: () => void, openAddNotification: (res: any) => void }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false)

  const handleOnFinish = (values: any) => {
    setLoading(true)
    fetch('https://my-json-server.typicode.com/tractian/fake-api/assets/', { method: 'POST', body: JSON.stringify(values) })
    .then((res) => {
      openAddNotification(res)
      onCancel()
    })
    .catch((err) => openAddNotification(err))
    .finally(() => setLoading(false))
    
  }

  return (
    <Form
      layout={'vertical'}
      form={form}
      initialValues={{ layout: 'vertical' }}
      onValuesChange={() => {}}
      onFinish={handleOnFinish}
      style={{ maxWidth: 600 }}
    >
      <Form.Item label="Image of Asset" name="image">
        <AddImage setFormImageValue={(image: any) => form.setFieldValue('image', image)}/>
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
        <AddAssignedUserIds setFormUserIdsValue={(unitId: number[]) => form.setFieldValue('assignedusersids', unitId)} />
      </Form.Item>
      <Form.Item label="Assigned Unit" name="assignedunitid">
        <AddAssinedUnitId setFormUnitIdValue={(unitId: number) => form.setFieldValue('assignedunitid', unitId)}/>
      </Form.Item>
      <Form.Item label="Assigned Company" name="assignedcompanyid">
        <AddAssignedCompanyId setFormCompanyIdValue={(companyId: number) => form.setFieldValue('assignedcompanyid', companyId)} />
      </Form.Item>
      <Form.Item>
        <Button onClick={onCancel}>Cancel</Button>
        <Button style={{float: 'right'}} type="primary" htmlType="submit">Add Asset!</Button>
      </Form.Item>
    </Form>
  );
};

export default AssetsAddAssetForm;