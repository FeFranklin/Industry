import React, { useState, useEffect } from 'react';
import { Space, Table, Tag, Button, Badge, Typography, Tooltip, Modal, notification } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { AssetsDataType } from '@/types/types';
import { QuestionCircleOutlined, DeleteOutlined, ExclamationCircleFilled, InfoCircleFilled } from '@ant-design/icons';

enum Status {
  inOperation = "processing",
  inAlert = "error",
  inDowntime = "warning"
}

const getStatus = (status: string) => {
  return Status[status as keyof typeof Status]
}

const randomFailRequestMock = () => Math.random() > 0.5

const { Title, Link } = Typography;

const AssetsTable = ({
  data,
  sidePanelOpen,
  setSelectedItem,
  setSidePanelOpen
}: {
  data: AssetsDataType[],
  sidePanelOpen: boolean,
  setSelectedItem: React.Dispatch<React.SetStateAction<number>>,
  setSidePanelOpen:React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [openDeleteModal, setOpenDeleteModal] = useState<AssetsDataType | null>()
  const [loading, setLoading] = useState(false)
  const [api, contextHolder] = notification.useNotification();

  const columns: ColumnsType<AssetsDataType> = [
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
      dataIndex: 'name',
      render: (_, record) => (
        <Tooltip title="Click here to edit this asset!">
          <Link onClick={() => console.log('hehehe')}>{record.name} <QuestionCircleOutlined /></Link >
        </Tooltip>
      ),
    },
    {
      title: 'sensors',
      key: 'sensors',
      dataIndex: 'sensors'
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
          <Tooltip title="delete asset!">
            <Button
              type="primary"
              danger
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => setOpenDeleteModal(record)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ]

  const openDeleteNotification = (res: any) => {
    let notificationDescription =  'Asset has been deleted.'
    let notificationIcon = <InfoCircleFilled style={{ color: '#389e0d' }} />
    if (res.status > 299 || randomFailRequestMock()) {
      notificationDescription = 'Operation failed :( please try again later.'
      notificationIcon = <ExclamationCircleFilled style={{ color: '#FF0000' }} />
    }
    api.open({
      message: 'Deletion Operation',
      description: notificationDescription,
      icon: notificationIcon,
    });
  }

  const handleDelete = () => {
    setLoading(true)
    fetch(`https://my-json-server.typicode.com/tractian/fake-api/assets/${openDeleteModal?.id}`, { method: 'DELETE' })
      .then((res) => {
        openDeleteNotification(res)
      })
      .catch((err) => openDeleteNotification(err))
      .finally(() => setLoading(false))

    setOpenDeleteModal(null)
  }

  return (
  <>
    {contextHolder}
    <Modal
      title="Are you sure you would like to delete this asset?"
      centered
      open={!!openDeleteModal}
      footer={[
        <Button
          key="cancel"
          type="primary"
          onClick={() => setOpenDeleteModal(null)}
        >
          Cancel
        </Button>,
        <Button type="primary" key="delete" danger onClick={handleDelete} loading={loading}>
          Delete
        </Button>,
      ]}
    >
      <p>Please confirm below.</p>
    </Modal>
    <Title level={2}>Assets</Title>
    <Table columns={columns} dataSource={data} />
  </>
  )
}

export default AssetsTable;