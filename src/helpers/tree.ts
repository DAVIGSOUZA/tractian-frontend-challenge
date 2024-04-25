/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { Asset, Item, Location, LocationItem } from '@/types'

const isRoot = (item: Item) =>
  (item.type === 'location' && item.parentId === null) ||
  (item.type !== 'location' &&
    item.parentId === null &&
    item.locationId === null)

function insertChildrenIntoParent(dataArray: Item[]) {
  const idItemMap: Record<string, Item> = {}

  dataArray.forEach((item) => {
    idItemMap[item.id] = item
  })

  const result: Item[] = []

  dataArray.forEach((item) => {
    if (isRoot(item)) {
      result.push(item)
    }

    if (item.type === 'location' && item.parentId !== null) {
      const parentItem = idItemMap[item.parentId]

      parentItem.children.push(item)
    }

    if (
      item.type !== 'location' &&
      (item.locationId !== null || item.parentId !== null)
    ) {
      const parentId = (item.locationId ?? item.parentId)!

      const parentItem = idItemMap[parentId]

      parentItem.children.push(item)
    }
  })

  return result
}

export function buildTree({
  locations,
  assets,
}: {
  locations: Location[]
  assets: Asset[]
}) {
  const locationItems: LocationItem[] = locations.map((location) => ({
    ...location,
    children: [],
    type: 'location',
  }))

  const assetItems: Item[] = assets.map((item) => ({
    ...item,
    children: [],
    type: item.status == null ? 'asset' : 'component',
  }))

  const tree = insertChildrenIntoParent([...locationItems, ...assetItems])

  return tree
}
