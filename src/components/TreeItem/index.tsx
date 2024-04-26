import { useSearchParams } from 'next/navigation'
import { type FC, useState } from 'react'
import { isSearchValid, searchMatcher } from '@/helpers/tree'
import { ArrowIcon } from '@/icons/ArrowIcon'
import { AssetIcon } from '@/icons/AssetIcon'
import { BoltIcon } from '@/icons/BoltIcon'
import { CircleIcon } from '@/icons/CircleIcon'
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

export const TreeItem: FC<TreeItemProps> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false)
  const searchParams = useSearchParams()

  const shouldDisplaySubitems = (item: Item) => {
    const searchTerm = searchParams.get('search') ?? ''

    return isSearchValid(searchTerm) && searchMatcher(searchTerm, item)
  }

  const hasChildren = item.children.length > 0

  return item.display ? (
    <div>
      <div
        className="flex"
        onClick={() => setIsOpen((prevState) => !prevState)}
      >
        {hasChildren && <ArrowIcon className="fill-secondary" />}

        {getIcon(item.type)}

        <span>{item.name}</span>

        {item.type === 'component' && item.sensorType !== 'energy' && (
          <CircleIcon
            className={
              item.status === 'operating' ? 'bg-[#52C41A]' : 'bg-red-500'
            }
          />
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
                display:
                  subItem.children.length === 0 || shouldDisplaySubitems(item)
                    ? true
                    : subItem.display,
              }}
            />
          ))}
        </div>
      )}
    </div>
  ) : null
}
