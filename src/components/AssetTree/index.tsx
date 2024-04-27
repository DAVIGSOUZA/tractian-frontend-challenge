import type { FC } from 'react'
import type { Item } from '@/types'
import { TreeItem } from '../TreeItem'

type AssetTreeProps = {
  tree: Item[]
}

export const AssetTree: FC<AssetTreeProps> = ({ tree }) => {
  return (
    <div className="h-[calc(100%-48px)] overflow-y-scroll p-3">
      {tree.map((item) => (
        <TreeItem key={item.id} item={item} />
      ))}
    </div>
  )
}
