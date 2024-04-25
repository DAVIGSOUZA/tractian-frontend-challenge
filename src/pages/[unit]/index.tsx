import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { type ChangeEvent, useEffect, useState } from 'react'
import { AssetTree } from '@/components/AssetTree'
import { getUnitData } from '@/helpers/getUnitData'
import { buildTree } from '@/helpers/tree'
import { useDebounce } from '@/hooks/useDebounce'
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

  const unitData: UnitData | undefined = getUnitData(unit)

  if (unit == null || unitData == null) {
    return { notFound: true }
  }

  const assetsTree = buildTree({
    locations: unitData.locations,
    assets: unitData.assets,
    searchTerm,
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
    setSearchInput('')
  }, [unit])

  const handleSearch = useDebounce((value: string) => {
    const params = new URLSearchParams(searchParams)

    if (value) {
      params.set('search', value)

      router.push(`${pathname}?${params.toString()}`)
    } else {
      params.delete('search')

      router.push(`${pathname}`)
    }
  })

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)

    handleSearch(e.target.value)
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

      <AssetTree tree={assetsTree} />
    </div>
  )
}
