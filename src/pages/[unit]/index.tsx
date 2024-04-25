import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { AssetTree } from '@/components/AssetTree'
import { getUnitData } from '@/helpers/getUnitData'
import { buildTree } from '@/helpers/tree'
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
  return (
    <div>
      <h1>Unidade de {unit}</h1>
      <AssetTree tree={assetsTree} />
    </div>
  )
}
