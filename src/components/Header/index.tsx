import Link from 'next/link'
import { useParams } from 'next/navigation'
import type { FC } from 'react'

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
    <header>
      <nav>
        <ul className="flex gap-3">
          {units.map((unit) => (
            <li
              key={unit.label}
              className={
                unit.href.includes(unitParam as string)
                  ? 'text-primary'
                  : undefined
              }
            >
              <Link href={unit.href}>{unit.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
