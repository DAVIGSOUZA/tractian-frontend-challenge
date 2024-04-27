import type { FC, ReactNode } from 'react'

type CardProps = {
  children: ReactNode
  className?: string
}

export const Card: FC<CardProps> = ({ children, className }) => {
  return (
    <div className={`border-card rounded-sm border ${className}`}>
      {children}
    </div>
  )
}
