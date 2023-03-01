import React, {useState, useEffect } from 'react';
import { Select } from 'antd';
import { CompaniesDataType } from '@/types/types';

const flattenUserIdsData = (data: CompaniesDataType[] | undefined) => data?.map((unit: CompaniesDataType) => ({label: unit.name, value: unit.id}))

const AddAssignedCompanyId = ({setFormCompanyIdValue}: {setFormCompanyIdValue: (companyId: number) => void}) => {
  const [data, setData] = useState<CompaniesDataType[]>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch('https://my-json-server.typicode.com/tractian/fake-api/companies')
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
      defaultValue=""
      style={{ width: '100%' }}
      onChange={handleChange}
      options={flattenUserIdsData(data)}
    />
)};

export default AddAssignedCompanyId;