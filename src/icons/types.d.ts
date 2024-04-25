import type React from 'react'

export type IconParentProps = {
  children: React.ReactNode
  width?: number
  height?: number
  viewBox?: string
  className?: string
}

export type IconProps = Omit<IconParentProps, 'children'>
