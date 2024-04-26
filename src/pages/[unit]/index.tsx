import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { type ChangeEvent, useEffect, useState } from 'react'
import { AssetTree } from '@/components/AssetTree'
import { getUnitData } from '@/helpers/getUnitData'
import { buildTree } from '@/helpers/tree'
import { useDebounce } from '@/hooks/useDebounce'
import { AtentionIcon } from '@/icons/AtentionIcon'
import { ThunderboltIcon } from '@/icons/ThunderBoltIcon'
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

  const handleFilter = (filterType: 'energy' | 'critical') => {
    const params = new URLSearchParams(searchParams)

    const filterValue = params.get(filterType)

    params.delete('search')

    params.delete('energy')

    params.delete('critical')

    if (
      (filterType === 'energy' && filterValue) ||
      (filterType === 'critical' && filterValue)
    ) {
      router.push(pathname)

      return
    }

    params.set(filterType, 'true')

    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div>
      <h1>Unidade de {unit}</h1>
      <input
        type="text"
        placeholder="Buscar Ativo ou Local"
        value={searchInput}
        onChange={handleSearchInput}
      />

      <button className="flex" onClick={() => handleFilter('energy')}>
        <ThunderboltIcon />
        <span>Sendor de Energia</span>
      </button>

      <button className="flex" onClick={() => handleFilter('critical')}>
        <AtentionIcon />
        <span>Crítico</span>
      </button>

      <AssetTree tree={assetsTree} />
    </div>
  )
}
