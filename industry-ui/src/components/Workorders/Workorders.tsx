import React, { useState, useEffect } from 'react';
import { Table, Typography, Tag, Badge } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import TableSkeleton from '../Loading/TableSkeleton'
import { WorkorderDataType } from '@/types/types';
import { WorkorderStatus, WorkorderPriorityColours } from '@/types/types';

const { Title } = Typography;

const getStatus = (status: string) => {
  return WorkorderStatus[status.replace(/\s/g, "") as keyof typeof WorkorderStatus ?? 'default']
}

const getPriority = (priority: string) => WorkorderPriorityColours[priority as keyof typeof WorkorderPriorityColours ?? 'default']

const Workorders = () => {
  const [data, setData] = useState<WorkorderDataType[]>()
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch('https://my-json-server.typicode.com/tractian/fake-api/workorders')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [])

  if (isLoading) return <TableSkeleton />
  const columns: ColumnsType<WorkorderDataType> = [
    {
      title: 'title',
      key: 'title',
      dataIndex: 'title'
    },
    {
      title: 'status',
      key: 'status',
      dataIndex: 'status',
      render: (_, record) => (
        <Badge status={getStatus(record?.status)} text={record?.status} />
      ),
    },
    {
      title: 'assetId',
      key: 'assetId',
      dataIndex: 'assetId'
    },
    {
      title: 'assignedUserIds',
      key: 'assignedUserIds',
      dataIndex: 'assignedUserIds',
      render: (_, { assignedUserIds }) => (
        <>
          {assignedUserIds?.map((userId) => (
              <Tag color="green" key={userId}>
                User {userId.toString()}
              </Tag>
            )
          )}
        </>
      ),
    },
    {
      title: 'priority',
      key: 'priority',
      dataIndex: 'priority',
      render: (_, record) => (
        <Tag color={getPriority(record?.priority)}>{record?.priority}</Tag>
      ),
    }
  ]

  return (
  <>
    <Title level={2}>Workorders</Title>
    <Table columns={columns} dataSource={data} />
  </>
  )
}

export default Workorders;