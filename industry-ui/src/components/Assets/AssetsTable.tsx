import React, { useState, useEffect } from 'react';
import { Space, Table, Tag, Button, Badge, Typography, Col, Row, Tooltip, Modal, notification, Divider } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { AssetsDataType } from '@/types/types';
import { EditFilled, DeleteOutlined, ExclamationCircleFilled, InfoCircleFilled, PlusCircleFilled } from '@ant-design/icons';
import AssetsAddAssetForm from './AssetsAddAssetForm/AssetsAddAssetForm';

enum Status {
  inOperation = "processing",
  inAlert = "error",
  inDowntime = "warning"
}

const { confirm } = Modal;

const getStatus = (status: string) => {
  return Status[status as keyof typeof Status]
}

const randomFailRequestMock = () => Math.random() > 0.5

const { Title, Text, Link } = Typography;

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
  const [openAddModal, setOpenAddModal] = useState<boolean>(false)
  const [loading, setLoading] = useState(false)
  const [api, contextHolder] = notification.useNotification();

  const columns: ColumnsType<AssetsDataType> = [
    {
      title: 'edit',
      key: 'edit',
      dataIndex: '',
      render: (_, record) => (
        <Tooltip title="Click here to edit this asset!">
          <Link onClick={() => console.log(record)}><EditFilled /></Link>
        </Tooltip>
      ),
    },
    {
      title: 'name',
      key: 'name',
      dataIndex: 'name',
      render: (_, record) => (
        <Tooltip title="Click here to edit this asset!">
          <Text onClick={() => console.log('hehehe')}>{record.name}</Text >
        </Tooltip>
      ),
    },
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
        <Space size='small' style={{width: '100%', justifyContent: 'space-between'}} split={<Divider type="vertical" />}>
          <Tooltip title="More information.">
            <Button
              onClick={() => {
                setSelectedItem(index)
                setSidePanelOpen(true)
              }}
              disabled={sidePanelOpen}
            > Open {record.name}</Button>
          </Tooltip>
          <Tooltip title="Delete asset.">
            <Button
              type="primary"
              danger
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => showConfirm(record)}
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

  const openAddNotification = (res: any) => {
    let notificationDescription =  'Asset has been added!'
    let notificationIcon = <InfoCircleFilled style={{ color: '#389e0d' }} />
    if (res.status > 299 || randomFailRequestMock()) {
      notificationDescription = 'Operation failed :( please try again later.'
      notificationIcon = <ExclamationCircleFilled style={{ color: '#FF0000' }} />
    }
    api.open({
      message: 'Add Operation',
      description: notificationDescription,
      icon: notificationIcon,
    });
  }

  const showConfirm = (record: AssetsDataType) => {
    confirm({
      title: 'Delete this asset?',
      icon: <ExclamationCircleFilled />,
      content: `Please confirm deletion of ${record.name}.`,
      onOk() {
        handleDelete(record);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const handleDelete = (record: AssetsDataType) => {
    setLoading(true)
    fetch(`https://my-json-server.typicode.com/tractian/fake-api/assets/${record?.id}`, { method: 'DELETE' })
    .then((res) => {
      openDeleteNotification(res)
    })
    .catch((err) => openDeleteNotification(err))
    .finally(() => setLoading(false))
  }

  return (
  <>
    {contextHolder}
    <Modal
      title="Adding new asset to the inventory!"
      centered
      open={!!openAddModal}
      footer={[]}
      onCancel={() => setOpenAddModal(false)}
    >
      <AssetsAddAssetForm openAddNotification={openAddNotification} onCancel={() => setOpenAddModal(false)} />
    </Modal>
    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
      <Title level={2}>Assets</Title>
      <Tooltip title="Add new asset.">
        <Button type="primary" icon={<PlusCircleFilled />} style={{float: 'right'}} onClick={() => setOpenAddModal(true)}>Add new Asset</Button>
      </Tooltip>
      <Table columns={columns} dataSource={data} />
    </Space>
  </>
  )
}

export default AssetsTable;