import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import type { FC } from 'react'
import { appSearchParams } from '@/constants'
import { AtentionIcon } from '@/icons/AtentionIcon'
import { ThunderboltIcon } from '@/icons/ThunderBoltIcon'
import { PanelButton } from './PanelButton'

export const PanelHeader: FC = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const handleFilter = (filterType: 'energy' | 'critical') => {
    const params = new URLSearchParams(searchParams)

    const filterValue = params.get(filterType)

    for (const [key] of Object.entries(appSearchParams)) {
      params.delete(key)
    }

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

  const unitLabel = pathname.slice(1)

  const isEnergyBtnActive = searchParams.get(appSearchParams.energy) === 'true'

  const isCriticalBtnActive =
    searchParams.get(appSearchParams.critical) === 'true'

  return (
    <div className="mb-3 flex items-center justify-between">
      <div className="flex items-center">
        <span className="mr-[7px] text-xl font-semibold">Ativos</span>
        <span className="text-sm capitalize text-[#77818C]">
          / {unitLabel} Unit
        </span>
      </div>

      <div className="flex items-center gap-2">
        <PanelButton
          icon={
            <ThunderboltIcon
              className={isEnergyBtnActive ? 'fill-white' : 'fill-primary'}
            />
          }
          label="Sensor de Energia"
          onClick={() => handleFilter('energy')}
          isActive={isEnergyBtnActive}
        />

        <PanelButton
          icon={
            <AtentionIcon
              className={isCriticalBtnActive ? 'fill-white' : 'fill-primary'}
            />
          }
          label="Crítico"
          onClick={() => handleFilter('critical')}
          isActive={isCriticalBtnActive}
        />
      </div>
    </div>
  )
}
