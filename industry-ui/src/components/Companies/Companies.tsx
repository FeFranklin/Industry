import React, { useState, useEffect } from 'react'
import { Table, Typography } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import TableSkeleton from '../Loading/TableSkeleton'
import { CompaniesDataType } from '@/types/types'

const { Title } = Typography

const Companies = () => {
  const [data, setData] = useState<CompaniesDataType[]>()
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch('https://my-json-server.typicode.com/tractian/fake-api/companies')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [])

  if (isLoading) return <TableSkeleton />
  const columns: ColumnsType<CompaniesDataType> = [
    {
      title: 'id',
      key: 'id',
      dataIndex: 'id',
    },
    {
      title: 'name',
      key: 'name',
      dataIndex: 'name',
    },
  ]

  return (
    <>
      <Title level={2}>Companies</Title>
      <Table columns={columns} dataSource={data} />
    </>
  )
}

export default Companies
