import React, { useState, useRef } from 'react'
import {
  Space,
  Table,
  Tag,
  Button,
  Badge,
  Typography,
  Tooltip,
  Modal,
  notification,
  Divider,
} from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { AssetsDataType, AssetsStatus, AssetsTableProps } from '@/types/types'
import {
  EditFilled,
  DeleteOutlined,
  ExclamationCircleFilled,
  InfoCircleFilled,
  PlusCircleFilled,
} from '@ant-design/icons'
import AssetForm from './AssetsAddAssetForm/AssetForm'
import styles from '@/styles/AssetsTable.module.scss'
import { randomFailRequestMock } from '@/utils/utils'

const { confirm } = Modal

const getStatus = (status: string) => {
  return AssetsStatus[status as keyof typeof AssetsStatus]
}

const { Title, Text, Link } = Typography

const AssetsTable = ({
  data,
  sidePanelOpen,
  setSelectedItem,
  setSidePanelOpen,
}: AssetsTableProps) => {
  const [openFormModal, setOpenFormModal] = useState<boolean>(false)
  const [assetInEdition, setAssetInEdition] = useState<AssetsDataType | null>(
    null
  )
  const formRef = useRef<{ clearForm: () => void }>()
  const [loading, setLoading] = useState(false)
  const [api, contextHolder] = notification.useNotification()

  const columns: ColumnsType<AssetsDataType> = [
    {
      title: 'edit',
      key: 'edit',
      dataIndex: '',
      render: (_, record) => (
        <Tooltip title="Click here to edit this asset!">
          <Link
            onClick={() => {
              setOpenFormModal(true)
              setAssetInEdition(record)
            }}
          >
            <EditFilled />
          </Link>
        </Tooltip>
      ),
    },
    {
      title: 'name',
      key: 'name',
      dataIndex: 'name',
      render: (_, record) => (
        <Tooltip title="Click here to edit this asset!">
          <Text onClick={() => console.log('hehehe')}>{record.name}</Text>
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
          ))}
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
      dataIndex: 'sensors',
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
        <Space
          size="small"
          style={{ width: '100%', justifyContent: 'space-between' }}
          split={<Divider type="vertical" />}
        >
          <Tooltip title="More information.">
            <Button
              onClick={() => {
                setSelectedItem(index)
                setSidePanelOpen(true)
              }}
              disabled={sidePanelOpen}
            >
              {' '}
              Open {record.name}
            </Button>
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
    let notificationDescription = 'Asset has been deleted.'
    let notificationIcon = <InfoCircleFilled style={{ color: '#389e0d' }} />
    if (res.status > 299 || randomFailRequestMock()) {
      notificationDescription = 'Operation failed :( please try again later.'
      notificationIcon = (
        <ExclamationCircleFilled style={{ color: '#FF0000' }} />
      )
    }
    api.open({
      message: 'Deletion Operation',
      description: notificationDescription,
      icon: notificationIcon,
    })
  }

  const openNotificaiton = (res: any, method: string) => {
    let notificationDescription = 'Asset has been added!'
    let notificationIcon = <InfoCircleFilled style={{ color: '#389e0d' }} />
    if (method === 'PUT') {
      notificationDescription = 'Asset has been updated!'
    }
    if (res.status > 299 || randomFailRequestMock()) {
      notificationDescription = 'Operation failed :( please try again later.'
      notificationIcon = (
        <ExclamationCircleFilled style={{ color: '#FF0000' }} />
      )
    }
    api.open({
      message: 'Operation',
      description: notificationDescription,
      icon: notificationIcon,
    })
  }

  const showConfirm = (record: AssetsDataType) => {
    confirm({
      title: 'Delete this asset?',
      icon: <ExclamationCircleFilled />,
      content: `Please confirm deletion of ${record.name}.`,
      onOk() {
        handleDelete(record)
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }

  const handleDelete = (record: AssetsDataType) => {
    setLoading(true)
    fetch(
      `https://my-json-server.typicode.com/tractian/fake-api/assets/${record?.id}`,
      { method: 'DELETE' }
    )
      .then((res) => {
        openDeleteNotification(res)
      })
      .catch((err) => openDeleteNotification(err))
      .finally(() => setLoading(false))
  }

  const handleCloseModal = () => {
    formRef?.current?.clearForm()
    setOpenFormModal(false)
    setAssetInEdition(null)
  }

  const handleOpenModal = () => setOpenFormModal(true)

  return (
    <>
      {contextHolder}
      <Modal
        title={
          assetInEdition
            ? `Editing ${assetInEdition?.name}`
            : 'Adding new asset to the inventory!'
        }
        centered
        open={!!openFormModal}
        footer={[]}
        onCancel={handleCloseModal}
      >
        <AssetForm
          ref={formRef}
          defaultValues={assetInEdition}
          openNotificaiton={openNotificaiton}
          onCancel={handleCloseModal}
        />
      </Modal>
      <Space
        direction="vertical"
        size="middle"
        className={styles.assetsTableSpace}
      >
        <Title level={2}>Assets</Title>
        <Tooltip title="Add new asset.">
          <Button
            type="primary"
            icon={<PlusCircleFilled />}
            className={styles.addItemButton}
            onClick={handleOpenModal}
          >
            Add new Asset
          </Button>
        </Tooltip>
        <Table columns={columns} dataSource={data} />
      </Space>
    </>
  )
}

export default AssetsTable
