import React, { useState, useEffect } from 'react';
import { Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import TableSkeleton from '../Loading/TableSkeleton'

export interface DataType {
  name: string;
  email: string;
  id: number;
  unitId: number;
}
const { Title } = Typography;

const Users = () => {
  const [data, setData] = useState<DataType[]>()
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

  if (isLoading) return <TableSkeleton />
  const columns: ColumnsType<DataType> = [
    {
      title: 'companyId',
      key: 'companyId',
      dataIndex: 'companyId'
    },
    {
      title: 'name',
      key: 'name',
      dataIndex: 'name'
    },
    {
      title: 'email',
      key: 'email',
      dataIndex: 'email'
    },
    {
      title: 'unitId',
      key: 'unitId',
      dataIndex: 'unitId'
    }
  ]

  return (
  <>
    <Title level={2}>Users</Title>
    <Table columns={columns} dataSource={data} />
  </>
  )
}

export default Users;