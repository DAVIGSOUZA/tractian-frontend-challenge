import type { ReadonlyURLSearchParams } from 'next/navigation'
import { usePathname, useSearchParams } from 'next/navigation'
import { type FC, useEffect, useState } from 'react'
import { isSearchValid, searchMatcher } from '@/helpers/tree'
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

const initialIsOpen = (searchParams: ReadonlyURLSearchParams) => {
  const energyFilter = searchParams.get('energy')
  const criticalFilter = searchParams.get('critical')

  if (energyFilter === 'true' || criticalFilter === 'true') {
    return true
  }

  return false
}

export const TreeItem: FC<TreeItemProps> = ({ item }) => {
  const searchParams = useSearchParams()
  const path = usePathname()
  const [isOpen, setIsOpen] = useState(initialIsOpen(searchParams))

  useEffect(() => {
    setIsOpen(initialIsOpen(searchParams))
  }, [path, searchParams])

  const shouldDisplaySubitems = (parentitem: Item, childItem: Item) => {
    const searchTerm = searchParams.get('search') ?? ''

    return (
      isSearchValid(searchTerm) &&
      (childItem.children.length === 0 || searchMatcher(searchTerm, parentitem))
    )
  }

  const hasChildren = item.children.length > 0

  return item.display ? (
    <>
      <div
        className="flex"
        onClick={() => setIsOpen((prevState) => !prevState)}
      >
        {hasChildren && <ArrowIcon className="fill-secondary" />}

        {getIcon(item.type)}

        <span>{item.name}</span>

        {item.type === 'component' && item.sensorType !== 'energy' && (
          <div
            className={`h-2 w-2 rounded-full ${item.status === 'operating' ? 'bg-[#52C41A]' : 'bg-red-500'}`}
          ></div>
        )}

        {item.type === 'component' && item.sensorType === 'energy' && (
          <BoltIcon
            className={
              item.status === 'operating' ? 'fill-[#52C41A]' : 'fill-red-500'
            }
          />
        )}
      </div>

      {hasChildren && isOpen && (
        <div className="pl-8">
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
