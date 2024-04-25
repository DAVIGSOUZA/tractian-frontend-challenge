/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { Asset, Item, Location, LocationItem } from '@/types'

const isRoot = (item: Item) =>
  (item.type === 'location' && item.parentId === null) ||
  (item.type !== 'location' &&
    item.parentId === null &&
    item.locationId === null)

function mapIdToItem(dataArray: Item[]) {
  const idItemMap: Record<string, Item> = {}

  dataArray.forEach((item) => {
    idItemMap[item.id] = item
  })

  return idItemMap
}

const shouldOmit = (searchTerm: string | undefined, item: Item) => {
  let omit = false

  if (
    searchTerm == null ||
    searchTerm === '' ||
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) {
    console.log({ omit, item })

    return omit
  }

  omit = true

  console.log({ omit, item })

  return omit
}

function insertChildrenIntoParent(dataArray: Item[], searchTerm?: string) {
  const idItemMap: Record<string, Item> = mapIdToItem(dataArray)

  const result: Item[] = []

  dataArray.forEach((item) => {
    const omit = shouldOmit(searchTerm, item)

    if (isRoot(item)) {
      result.push({ ...item })
    }

    if (item.type === 'location' && item.parentId !== null) {
      const parentItem = idItemMap[item.parentId]

      parentItem.omit = omit

      parentItem.children.push(item)
    }

    if (
      item.type !== 'location' &&
      (item.locationId !== null || item.parentId !== null)
    ) {
      const parentId = (item.locationId ?? item.parentId)!

      const parentItem = idItemMap[parentId]

      parentItem.omit = omit

      parentItem.children.push(item)
    }
  })

  if (searchTerm != null && searchTerm !== '') {
    return result.map((item) => {
      if (
        item.children.length === 0 &&
        !item.name.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        item.omit = true
      }

      return item
    })
  }

  return result
}

export function buildTree({
  locations,
  assets,
  searchTerm,
}: {
  locations: Location[]
  assets: Asset[]
  searchTerm?: string
}) {
  const locationItems: LocationItem[] = locations.map((location) => ({
    ...location,
    children: [],
    omit: false,
    type: 'location',
  }))

  const assetItems: Item[] = assets.map((item) => ({
    ...item,
    children: [],
    omit: false,
    type: item.status == null ? 'asset' : 'component',
  }))

  const tree = insertChildrenIntoParent(
    [...locationItems, ...assetItems],
    searchTerm,
  )

  return tree
}
