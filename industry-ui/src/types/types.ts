export interface WorkorderDataType {
  assetId: number
  assignedUserIds?: number[] | null
  checklist?: ChecklistEntity[] | null
  description: string
  id: number
  priority: string
  status: string
  title: string
}

export interface ChecklistEntity {
  completed: boolean
  task: string
}

export interface UsersDataType {
  name: string
  email: string
  id: number
  unitId: number
}

export interface UnitDataType {
  companyId: number
  id: number
  name: string
}

export interface CompaniesDataType {
  name: string
  id: number
}

export interface AssetsDataType {
  assignedUserIds?: number[] | null
  companyId: number
  healthHistory?: HealthHistoryEntity[] | null
  healthscore: number
  id: number
  image: string
  metrics: Metrics
  model: string
  name: string
  sensors?: string[] | null
  specifications: Specifications
  status: string
  unitId: number
}
export interface HealthHistoryEntity {
  status: string
  timestamp: string
}
export interface Metrics {
  lastUptimeAt: string
  totalCollectsUptime: number
  totalUptime: number
}
export interface Specifications {
  maxTemp: number
}

export interface HealthHistoryEntity {
  status: string
  timestamp: string
}

export enum HealthStatus {
  inOperation = 1,
  inDowntime,
  inAlert,
  unplannedStop,
  plannedStop,
}

export interface AssetFormProps {
  onCancel: () => void
  openNotificaiton: (res: any, config: string) => void
  defaultValues: AssetsDataType | null
}

export interface AssetsTableProps {
  data: AssetsDataType[]
  sidePanelOpen: boolean
  setSelectedItem: React.Dispatch<React.SetStateAction<number>>
  setSidePanelOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export interface AssetsSidePanelProps {
  openPanel: boolean
  setOpenPanel: React.Dispatch<React.SetStateAction<boolean>>
  selectedItem: AssetsDataType
}

export enum WorkorderStatus {
  inprogress = 'processing',
  completed = 'success',
  default = 'default',
}

export enum WorkorderPriorityColours {
  low = 'lime',
  medium = 'blue',
  high = 'red',
}

export enum AssetsStatus {
  inOperation = 'processing',
  inAlert = 'error',
  inDowntime = 'warning',
}
