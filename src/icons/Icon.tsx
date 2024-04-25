import { type FC } from 'react'
import type { IconParentProps } from './types'

export const Icon: FC<IconParentProps> = ({
  className,
  viewBox = '0 0 22 22',
  height = 22,
  width = 22,
  children,
}) => {
  return (
    <svg
      width={`${width}`}
      height={`${height}`}
      viewBox={`${viewBox}`}
      className={`fill-primary ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  )
}
