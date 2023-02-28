import React, { useState } from 'react';
import { Space, Table, Tag, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';

export interface DataType {
  assignedUserIds?: (number)[] | null;
  companyId: number;
  healthHistory?: (HealthHistoryEntity)[] | null;
  healthscore: number;
  id: number;
  image: string;
  metrics: Metrics;
  model: string;
  name: string;
  sensors?: (string)[] | null;
  specifications: Specifications;
  status: string;
  unitId: number;
}
export interface HealthHistoryEntity {
  status: string;
  timestamp: string;
}
export interface Metrics {
  lastUptimeAt: string;
  totalCollectsUptime: number;
  totalUptime: number;
}
export interface Specifications {
  maxTemp: number;
}


const AssetsTable = ({
  data,
  sidePanelOpen,
  setSelectedItem,
  setSidePanelOpen
}: {
  data: DataType,
  sidePanelOpen: boolean,
  setSelectedItem: React.Dispatch<React.SetStateAction<number>>,
  setSidePanelOpen:React.Dispatch<React.SetStateAction<boolean>>
}) => {

  const columns: ColumnsType<DataType> = [
    {
      title: 'assignedUserIds',
      dataIndex: 'assignedUserIds',
      key: 'assignedUserIds',
      render: (_, { assignedUserIds }) => (
        <>
          {assignedUserIds?.map((userId) => (
              <Tag color="green" key={userId}>
                User {userId.toString().toUpperCase()}
              </Tag>
            )
          )}
        </>
      ),
    },
    {
      title: 'companyId',
      dataIndex: 'companyId',
      key: 'companyId',
    },
    {
      title: 'model',
      dataIndex: 'model',
      key: 'model',
    },
    {
      title: 'name',
      key: 'name',
      dataIndex: 'name'
    },
    {
      title: 'sensors',
      key: 'sensors',
      dataIndex: 'sensors'
    },
    {
      title: 'status',
      key: 'status',
      dataIndex: 'status'
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record, index) => (
        <Space size="middle">
          <Button
            onClick={() => {
              setSelectedItem(index)
              setSidePanelOpen(true)
            }}
            disabled={sidePanelOpen}
            type="primary"
          > Open {record.name}</Button>
        </Space>
      ),
    },
  ]

  return <Table columns={columns} dataSource={data} />
}

export default AssetsTable;