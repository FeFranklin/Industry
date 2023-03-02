import React, {useState, useEffect } from 'react';
import { Select } from 'antd';
import { UnitDataType } from '@/types/types';

const flattenUserIdsData = (data: UnitDataType[] | undefined) => data?.map((unit: UnitDataType) => ({label: unit.name, value: unit.id.toString()}))

const AddAssinedUnitId = ({setFormUnitIdValue, defaultValue}: {setFormUnitIdValue: (companyId: number) => void, defaultValue: number | undefined | null}) => {
  const [data, setData] = useState<UnitDataType[]>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch('https://my-json-server.typicode.com/tractian/fake-api/units')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [])

  const handleChange = (value: string) => setFormUnitIdValue(parseInt(value))
  
  return (
    <Select
      loading={loading}
      defaultValue={defaultValue?.toString()}
      style={{ width: '100%' }}
      onChange={handleChange}
      options={flattenUserIdsData(data)}
    />
)};

export default AddAssinedUnitId;