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
} & Location

export type AssetItem = {
  type: 'asset' | 'component'
  children: Item[]
} & Asset

export type Item = LocationItem | AssetItem

export type UnitData = {
  assets: Asset[]
  locations: Location[]
}
