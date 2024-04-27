import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { AssetCard } from '@/components/AssetCard'
import { AssetTreeCard } from '@/components/AssetTreeCard'
import { getUnitData } from '@/helpers/getUnitData'
import { buildTree } from '@/helpers/tree'
import type { Asset, AssetType, Item, Location, UnitData } from '@/types'

type UnitPageProps = {
  assetsTree: Item[]
  asset: Location | Asset | null
  type: AssetType | null
}

export const getServerSideProps: GetServerSideProps<UnitPageProps> = async (
  ctx,
) => {
  const unit = ctx.params?.unit as string
  const searchTerm = ctx.query?.search as string | undefined
  const energyQuery = ctx.query?.energy as string | undefined
  const criticalQuery = ctx.query?.critical as string | undefined
  const idQuery = ctx.query?.id as string | undefined
  const typeQuery = ctx.query?.type as AssetType | undefined

  const unitData: UnitData | undefined = getUnitData(unit)

  if (unit == null || unitData == null) {
    return { notFound: true }
  }

  let asset: Location | Asset | null = null

  if (idQuery != null && typeQuery != null) {
    const assetFinded =
      typeQuery !== 'location'
        ? unitData.assets.find((item) => item.id === idQuery)
        : unitData.locations.find((item) => item.id === idQuery)

    if (typeof assetFinded === 'undefined') {
      asset = null
    } else {
      asset = assetFinded
    }
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
      assetsTree,
      asset,
      type: typeQuery ?? null,
    },
  }
}

export default function UnitPage({
  assetsTree,
  asset,
  type,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="flex h-[calc(100%-45px)]">
      <AssetTreeCard assetsTree={assetsTree} className="h-full w-1/3" />

      <AssetCard className="ml-2 grow" asset={asset} type={type} />
    </div>
  )
}
