import React, { useState, useEffect } from 'react';
import { Select, Space } from 'antd';
import type { SelectProps } from 'antd';
import { UsersDataType } from '@/types/types';
const options: SelectProps['options'] = [];

for (let i = 10; i < 36; i++) {
  options.push({
    label: i.toString(36) + i,
    value: i.toString(36) + i,
  });
}

const handleChange = (value: string[]) => {
  console.log(`selected ${value}`);
};

const flattenUserIdsData = (data: UsersDataType[] | undefined) => data?.map((user: UsersDataType) => ({label: user.name, value: user.id}))

const AddAssignedUserIds = () => {
  const [data, setData] = useState<UsersDataType[]>()
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch('https://my-json-server.typicode.com/tractian/fake-api/users')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [])
  
  return (
  <Space style={{ width: '100%' }} direction="vertical">
    <Select
      mode="multiple"
      allowClear
      style={{ width: '100%' }}
      placeholder="Please select"
      defaultValue={[]}
      onChange={handleChange}
      options={flattenUserIdsData(data)}
    />
  </Space>
)};

export default AddAssignedUserIds;