import { useState, useEffect } from 'react'
import AssetsTable from './AssetsTable'
import AssetsSidePanel from './AssetsSidePanel'
import TableSkeleton from '../Loading/TableSkeleton'
import { AssetsDataType } from '@/types/types';

const Assets = () => {
  const [data, setData] = useState<AssetsDataType[] | null>(null)
  const [isLoading, setLoading] = useState(false)
  const [sidePanelOpen, setSidePanelOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState(-1)

  useEffect(() => {
    setLoading(true)
    fetch('https://my-json-server.typicode.com/tractian/fake-api/assets')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [])

  if (isLoading) return <TableSkeleton />
  if (!data) return <p>No profile data</p>

  return (
    <>
      <AssetsSidePanel selectedItem={data[selectedItem]} openPanel={sidePanelOpen} setOpenPanel={setSidePanelOpen} />
      <AssetsTable sidePanelOpen={sidePanelOpen} data={data} setSelectedItem={setSelectedItem} setSidePanelOpen={setSidePanelOpen}/>
    </>
  )
}

export default Assets