/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { Asset, Item, Location, LocationItem } from '@/types'

type SearchOptions = {
  searchTerm?: string
  onlyEnergySensors: boolean
  onlyCriticalStatus: boolean
}

const isRoot = (item: Item) =>
  (item.type === 'location' && item.parentId === null) ||
  (item.type !== 'location' &&
    item.parentId === null &&
    item.locationId === null)

const mapIdToItem = (dataArray: Item[]) => {
  const idItemMap: Record<string, Item> = {}

  dataArray.forEach((item) => {
    idItemMap[item.id] = item
  })

  return idItemMap
}

export const isSearchValid = (searchTerm: string | undefined) =>
  searchTerm != null && searchTerm !== ''

export const searchMatcher = (term: string, item: Item) =>
  item.name.toLowerCase().includes(term.toLowerCase())

const shouldDisplay = (searchOptions: SearchOptions, item: Item) => {
  if (searchOptions.onlyCriticalStatus && item.type === 'component') {
    return item.status === 'alert'
  }

  if (searchOptions.onlyEnergySensors && item.type === 'component') {
    return item.sensorType === 'energy'
  }

  if (
    !isSearchValid(searchOptions.searchTerm) ||
    searchMatcher(searchOptions.searchTerm as string, item)
  ) {
    return true
  }

  return false
}

const getParentItem = (item: Item, idItemMap: Record<string, Item>): Item => {
  if (item.type === 'location') {
    return idItemMap[item.parentId as string]
  }

  const parentId = (item.locationId ?? item.parentId)!

  return idItemMap[parentId]
}

const insertChildrenIntoParent = (
  dataArray: Item[],
  searchOptions: SearchOptions,
) => {
  const idItemMap: Record<string, Item> = mapIdToItem(dataArray)

  const result: Item[] = []

  dataArray.forEach((item) => {
    item.display = shouldDisplay(searchOptions, item)

    if (isRoot(item)) {
      result.push({ ...item })
    } else {
      const parentItem: Item = getParentItem(item, idItemMap)

      parentItem.children.push(item)
    }
  })

  return result
}

const displayParents = (arr: Item[]) => {
  arr.forEach((item) => {
    const child = item.children.find((child) => child.display === true)

    if (child?.display) {
      item.display = true
    } else {
      displayParents(item.children)
    }
  })
}

export const buildTree = ({
  locations,
  assets,
  searchTerm,
  onlyEnergySensors = false,
  onlyCriticalStatus = false,
}: {
  locations: Location[]
  assets: Asset[]
  searchTerm?: string
  onlyEnergySensors?: boolean
  onlyCriticalStatus?: boolean
}) => {
  const locationItems: LocationItem[] = locations.map((location) => ({
    ...location,
    children: [],
    display: isSearchValid(searchTerm) ? false : true,
    type: 'location',
  }))

  const assetItems: Item[] = assets.map((item) => ({
    ...item,
    children: [],
    display: isSearchValid(searchTerm) ? false : true,
    type: item.status == null ? 'asset' : 'component',
  }))

  const tree = insertChildrenIntoParent([...locationItems, ...assetItems], {
    searchTerm,
    onlyEnergySensors,
    onlyCriticalStatus,
  })

  if (isSearchValid(searchTerm)) {
    displayParents(tree)
  }

  return tree
}
