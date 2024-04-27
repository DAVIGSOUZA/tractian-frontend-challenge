import Link from 'next/link'
import { useParams } from 'next/navigation'
import type { FC } from 'react'
import { UnitIcon } from '@/icons/UnitIcon'
import { Logo } from '../Logo'

export const Header: FC = () => {
  const { unit: unitParam } = useParams()

  const units = [
    {
      label: 'Jaguar Unit',
      href: '/jaguar',
    },
    {
      label: 'Apex Unit',
      href: '/apex',
    },
    {
      label: 'Tobias Unit',
      href: '/tobias',
    },
  ]

  return (
    <header className="flex h-12 items-center justify-between bg-secondary px-4">
      <Logo className="fill-white" />

      <nav className="flex gap-3">
        {units.map((unit) => (
          <Link
            href={unit.href}
            key={unit.label}
            className={`flex items-center rounded-sm px-2 py-1 text-white ${
              unit.href.includes(unitParam as string)
                ? 'bg-blue-500'
                : 'bg-blue-900'
            }`}
          >
            <UnitIcon className="fill-white" />
            <span className="ml-2">{unit.label}</span>
          </Link>
        ))}
      </nav>
    </header>
  )
}
