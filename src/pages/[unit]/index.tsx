import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import type { ChangeEvent } from 'react'
import { useState } from 'react'
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

  const unitData: UnitData | undefined = getUnitData(unit)

  if (unit == null || unitData == null) {
    return { notFound: true }
  }

  const assetsTree = buildTree({
    locations: unitData.locations,
    assets: unitData.assets,
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
  const [searchTerm, setSearchTerm] = useState('')

  const debouncedSearch = useDebounce((value: string) => console.log(value))

  const handleSearchTermChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)

    debouncedSearch(e.target.value)
  }

  return (
    <div>
      <h1>Unidade de {unit}</h1>
      <input type="text" value={searchTerm} onChange={handleSearchTermChange} />
      <AssetTree tree={assetsTree} />
    </div>
  )
}
