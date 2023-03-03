import React, { useState, useEffect } from 'react'
import { Select, Space } from 'antd'
import type { SelectProps } from 'antd'
import { UsersDataType } from '@/types/types'

const flattenUserIdsData = (data: UsersDataType[] | undefined) =>
  data?.map((user: UsersDataType) => ({ label: user.name, value: user.id }))

const AddAssignedUserIds = ({
  setFormUserIdsValue,
  defaultValue,
}: {
  setFormUserIdsValue: (userIds: number[]) => void
  defaultValue: number[] | null | undefined
}) => {
  const [data, setData] = useState<UsersDataType[]>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_ADDR}users`)
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [])

  const handleChange = (value: any) => setFormUserIdsValue(value)

  return (
    <Space style={{ width: '100%' }} direction="vertical">
      <Select
        mode="multiple"
        allowClear
        loading={loading}
        style={{ width: '100%' }}
        placeholder="Please select"
        defaultValue={defaultValue}
        onChange={handleChange}
        onDeselect={handleChange}
        options={flattenUserIdsData(data)}
      />
    </Space>
  )
}

export default AddAssignedUserIds
