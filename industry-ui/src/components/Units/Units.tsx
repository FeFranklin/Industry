import React, { useState, useEffect } from 'react';
import { Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import TableSkeleton from '../Loading/TableSkeleton'

export interface DataType {
  name: string;
  companyId: number;
}
const { Title } = Typography;

const Units = () => {
  const [data, setData] = useState<DataType[]>()
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch('https://my-json-server.typicode.com/tractian/fake-api/units')
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
    }
  ]

  return (
  <>
    <Title level={2}>Units</Title>
    <Table columns={columns} dataSource={data} />
  </>
  )
}

export default Units;