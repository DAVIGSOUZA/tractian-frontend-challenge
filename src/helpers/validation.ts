import type { Item, SearchOptions } from '@/types'

export const isRoot = (item: Item) =>
  (item.type === 'location' && item.parentId === null) ||
  (item.type !== 'location' &&
    item.parentId === null &&
    item.locationId === null)

export const isSearchValid = (searchTerm: string | undefined) =>
  searchTerm != null && searchTerm !== ''

export const searchMatcher = (term: string, item: Item) =>
  item.name.toLowerCase().includes(term.toLowerCase())

export const shouldDisplay = (searchOptions: SearchOptions, item: Item) => {
  if (searchOptions.onlyCriticalStatus && item.type === 'component') {
    return item.status === 'alert'
  }

  if (searchOptions.onlyEnergySensors && item.type === 'component') {
    return item.sensorType === 'energy'
  }

  if (searchOptions.onlyEnergySensors || searchOptions.onlyCriticalStatus) {
    return false
  }

  if (
    !isSearchValid(searchOptions.searchTerm) ||
    searchMatcher(searchOptions.searchTerm as string, item)
  ) {
    return true
  }

  return false
}
