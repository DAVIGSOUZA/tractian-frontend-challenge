import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import type { ChangeEvent, FC } from 'react'
import { useEffect, useState } from 'react'
import { appSearchParams } from '@/constants'
import { useDebounce } from '@/hooks/useDebounce'
import { SearchIcon } from '@/icons/SearchIcon'
import type { Item } from '@/types'
import { Card } from '../Card'
import { TreeItem } from '../TreeItem'

type AssetTreeCardProps = {
  assetsTree: Item[]
  className?: string
}

export const AssetTreeCard: FC<AssetTreeCardProps> = ({
  assetsTree,
  className,
}) => {
  const [searchInput, setSearchInput] = useState('')
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(
    () => setSearchInput(searchParams.get(appSearchParams.search) ?? ''),
    [pathname, searchParams],
  )

  const handleSearch = useDebounce((value: string) => {
    const params = new URLSearchParams(searchParams)
    const { critical, energy, id, search, type } = appSearchParams
    const searchParamsToDelete = [critical, energy, id, type]

    if (value) {
      params.set(search, value)
    } else {
      params.delete(search)
    }

    searchParamsToDelete.forEach((searchParam) => {
      params.delete(searchParam)
    })

    const path =
      params.toString() !== '' ? `${pathname}?${params.toString()}` : pathname

    router.push(path)
  })

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)

    handleSearch(e.target.value)
  }

  return (
    <Card className={className}>
      <div className="flex items-center justify-between gap-3 border-b border-card p-3">
        <input
          className="w-full"
          type="text"
          placeholder="Buscar Ativo ou Local"
          value={searchInput}
          onChange={handleSearchInput}
        />
        <SearchIcon />
      </div>

      <div className="h-[calc(100%-49px)] overflow-y-scroll p-3">
        {assetsTree.map((item) => (
          <TreeItem key={item.id} item={item} />
        ))}
      </div>
    </Card>
  )
}
