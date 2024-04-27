import Image from 'next/image'
import { usePathname } from 'next/navigation'
import type { FC } from 'react'
import { BoltIcon } from '@/icons/BoltIcon'
import type { Asset, AssetType, Location } from '@/types'
import { Card } from '../Card'

type AssetCardProps = {
  asset?: Location | Asset
  type?: AssetType
  className?: string
}

export const AssetCard: FC<AssetCardProps> = ({ asset, type, className }) => {
  const pathname = usePathname()

  const unitLabel = `${pathname.slice(1)[0].toUpperCase()}${pathname.slice(2)} Unit`

  return (
    <Card className={`${className}`}>
      <div className="border-card flex items-center border-b px-4 py-[14px]">
        <span className="text-lg font-semibold">
          {asset != null ? asset.name : unitLabel}
        </span>

        {type === 'component' && (asset as Asset).sensorType !== 'energy' && (
          <div
            className={`ml-1 h-2 w-2 rounded-full ${(asset as Asset).status === 'operating' ? 'bg-[#52C41A]' : 'bg-red-500'}`}
          ></div>
        )}

        {type === 'component' && (asset as Asset).sensorType === 'energy' && (
          <BoltIcon
            className={`ml-1 ${
              (asset as Asset).status === 'operating'
                ? 'fill-[#52C41A]'
                : 'fill-red-500'
            }`}
          />
        )}
      </div>

      <div className="p-6">
        <div className="border-card mb-6 flex items-center border-b pb-6">
          <Image
            src={`/images/${type ?? 'unit'}.jpg`}
            alt={type ?? 'unit'}
            width={336}
            height={226}
            className="rounded"
          />

          <div className="grow pl-6">
            <div className="border-card mb-6 border-b pb-6">
              <p className="mb-2 font-semibold">Tipo de Equipamento</p>
              <p className="text-gray-500">Lorem ipsum</p>
            </div>

            <div>
              <p className="mb-2 font-semibold">Responsáveis</p>
              <p className="text-gray-500">Lorem ipsum</p>
            </div>
          </div>
        </div>

        <div className="flex">
          <div className="w-1/2">
            <p className="mb-2 font-semibold">Sensor</p>
            <p className="text-gray-500">Lorem ipsum</p>
          </div>
          <div>
            <p className="mb-2 font-semibold">Receptor</p>
            <p className="text-gray-500">Lorem ipsum</p>
          </div>
        </div>
      </div>
    </Card>
  )
}
