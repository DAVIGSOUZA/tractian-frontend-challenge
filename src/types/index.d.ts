export type AssetType = 'location' | 'asset' | 'component'

export type Location = {
  id: string
  name: string
  parentId: string | null
}

export type Asset = {
  id: string
  name: string
  parentId: string | null
  locationId: string | null
  sensorType: 'energy' | 'vibration' | null
  status: 'operating' | 'alert' | null
}

export type LocationItem = {
  type: 'location'
  children: Item[]
  display: boolean
} & Location

export type AssetItem = {
  type: 'asset' | 'component'
  children: Item[]
  display: boolean
} & Asset

export type Item = LocationItem | AssetItem

export type UnitData = {
  assets: Asset[]
  locations: Location[]
}
