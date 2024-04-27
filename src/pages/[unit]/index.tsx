import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { type ChangeEvent, useEffect, useState } from 'react'
import { AssetCard } from '@/components/AssetCard'
import { AssetTree } from '@/components/AssetTree'
import { Card } from '@/components/Card'
import { getUnitData } from '@/helpers/getUnitData'
import { buildTree } from '@/helpers/tree'
import { useDebounce } from '@/hooks/useDebounce'
import { SearchIcon } from '@/icons/SearchIcon'
import type { Item, UnitData } from '@/types'

type UnitPageProps = {
  unit: string
  assetsTree: Item[]
}

export const getServerSideProps: GetServerSideProps<UnitPageProps> = async (
  ctx,
) => {
  const unit = ctx.params?.unit as string
  const searchTerm = ctx.query?.search as string | undefined
  const energyQuery = ctx.query?.energy as string | undefined
  const criticalQuery = ctx.query?.critical as string | undefined

  const unitData: UnitData | undefined = getUnitData(unit)

  if (unit == null || unitData == null) {
    return { notFound: true }
  }

  const assetsTree = buildTree({
    locations: unitData.locations,
    assets: unitData.assets,
    searchTerm,
    onlyEnergySensors: energyQuery === 'true',
    onlyCriticalStatus: criticalQuery === 'true',
  })

  return {
    props: {
      unit,
      assetsTree,
    },
  }
}

export default function UnitPage({
  unit,
  assetsTree,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [searchInput, setSearchInput] = useState('')
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    setSearchInput(searchParams.get('search') ?? '')
  }, [searchParams, unit])

  const handleSearch = useDebounce((value: string) => {
    const params = new URLSearchParams(searchParams)

    if (value) {
      params.set('search', value)
    } else {
      params.delete('search')
    }

    params.delete('energy')

    params.delete('critical')

    const path =
      params.toString() !== '' ? `${pathname}?${params.toString()}` : pathname

    router.push(path)
  })

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)

    handleSearch(e.target.value)
  }

  return (
    <div className="flex h-[calc(100%-45px)]">
      <Card className="h-full w-1/3">
        <div className="border-card flex items-center justify-between gap-3 border-b p-3">
          <input
            className="w-full"
            type="text"
            placeholder="Buscar Ativo ou Local"
            value={searchInput}
            onChange={handleSearchInput}
          />
          <SearchIcon />
        </div>

        <AssetTree tree={assetsTree} />
      </Card>

      <AssetCard className="ml-2 grow" />
    </div>
  )
}
