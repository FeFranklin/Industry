import React, { useState, useEffect } from 'react'
import { Select } from 'antd'
import { CompaniesDataType } from '@/types/types'

const flattenUserIdsData = (data: CompaniesDataType[] | undefined) =>
  data?.map((unit: CompaniesDataType) => ({
    label: unit.name,
    value: unit.id.toString(),
  }))

const AddAssignedCompanyId = ({
  setFormCompanyIdValue,
  defaultValue,
}: {
  setFormCompanyIdValue: (companyId: number) => void
  defaultValue: number | undefined | null
}) => {
  const [data, setData] = useState<CompaniesDataType[]>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_ADDR}companies`)
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [])

  const handleChange = (value: string) => setFormCompanyIdValue(parseInt(value))

  return (
    <Select
      loading={loading}
      defaultValue={defaultValue?.toString()}
      style={{ width: '100%' }}
      onChange={handleChange}
      options={flattenUserIdsData(data)}
    />
  )
}

export default AddAssignedCompanyId
