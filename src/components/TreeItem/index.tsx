import { type FC, useState } from 'react'
import { ArrowIcon } from '@/icons/ArrowIcon'
import { AssetIcon } from '@/icons/AssetIcon'
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
      </div>

      {hasChildren && isOpen && (
        <div className="pl-8">
          {item.children.map((subItem) => (
            <TreeItem key={subItem.id} item={{ ...subItem, display: true }} />
          ))}
        </div>
      )}
    </div>
  ) : null
}
