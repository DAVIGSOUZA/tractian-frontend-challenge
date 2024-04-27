import type { ReadonlyURLSearchParams } from 'next/navigation'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { type FC, useEffect, useState } from 'react'
import { appSearchParams } from '@/constants'
import { isSearchValid, searchMatcher } from '@/helpers/validation'
import { ArrowIcon } from '@/icons/ArrowIcon'
import { AssetIcon } from '@/icons/AssetIcon'
import { BoltIcon } from '@/icons/BoltIcon'
import { ComponentIcon } from '@/icons/ComponentIcon'
import { LocationIcon } from '@/icons/LocationIcon'
import type { AssetType, Item } from '@/types'

type TreeItemProps = {
  item: Item
}

const getIcon = (type: AssetType) =>
  ({
    location: <LocationIcon className="fill-primary" />,
    asset: <AssetIcon className="fill-primary" />,
    component: <ComponentIcon className="fill-primary" />,
  })[type]

const initialIsOpen = (
  searchParams: ReadonlyURLSearchParams,
  prevState?: boolean,
) => {
  const energyFilter = searchParams.get(appSearchParams.energy)
  const criticalFilter = searchParams.get(appSearchParams.critical)
  const assetType = searchParams.get(appSearchParams.type)
  const assetId = searchParams.get(appSearchParams.id)

  if (energyFilter === 'true' || criticalFilter === 'true') {
    return true
  }

  if (assetType != null && assetId != null) {
    return prevState
  }

  return false
}

export const TreeItem: FC<TreeItemProps> = ({ item }) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(initialIsOpen(searchParams))
  const hasChildren = item.children.length > 0

  useEffect(() => {
    setIsOpen((prevState) => initialIsOpen(searchParams, prevState))
  }, [pathname, searchParams])

  const shouldDisplaySubitems = (parentitem: Item, childItem: Item) => {
    const searchTerm = searchParams.get(appSearchParams.search) ?? ''

    return (
      isSearchValid(searchTerm) &&
      (childItem.children.length === 0 || searchMatcher(searchTerm, parentitem))
    )
  }

  const handleClick = (item: Item) => {
    setIsOpen((prevState) => !prevState)

    const params = new URLSearchParams(searchParams)

    params.set(appSearchParams.type, item.type)

    params.set(appSearchParams.id, item.id)

    const path = `${pathname}?${params.toString()}`

    router.push(path)
  }

  return item.display ? (
    <>
      <button
        className="mb-1 grid grid-cols-[16px_24px_1fr]"
        onClick={() => handleClick(item)}
      >
        <div className="flex h-6 items-center justify-center">
          {hasChildren && (
            <ArrowIcon
              className={`fill-secondary ${!isOpen && '-rotate-90'}`}
            />
          )}
        </div>

        <div className="flex items-center justify-center">
          {getIcon(item.type)}
        </div>

        <div className="flex items-center truncate">
          <span className="truncate">{item.name}</span>

          {item.type === 'component' && item.sensorType !== 'energy' && (
            <div
              className={`ml-1 h-2 w-2 rounded-full ${item.status === 'operating' ? 'bg-[#52C41A]' : 'bg-red-500'}`}
            ></div>
          )}

          {item.type === 'component' && item.sensorType === 'energy' && (
            <BoltIcon
              className={`ml-1 ${
                item.status === 'operating' ? 'fill-[#52C41A]' : 'fill-red-500'
              }`}
            />
          )}
        </div>
      </button>

      {hasChildren && isOpen && (
        <div className="ml-2 border-l border-card pl-4">
          {item.children.map((subItem) => (
            <TreeItem
              key={subItem.id}
              item={{
                ...subItem,
                display: shouldDisplaySubitems(item, subItem)
                  ? true
                  : subItem.display,
              }}
            />
          ))}
        </div>
      )}
    </>
  ) : null
}
