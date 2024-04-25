import type { FC } from 'react'
import { Icon } from './Icon'
import type { IconProps } from './types'

export const ArrowIcon: FC<IconProps> = (props) => {
  return (
    <Icon width={10} height={10} viewBox="0 0 10 10" {...props}>
      <path d="M9.15167 2.14294H8.31461C8.25769 2.14294 8.20412 2.17085 8.17064 2.21661L4.99988 6.58714L1.82912 2.21661C1.79564 2.17085 1.74207 2.14294 1.68515 2.14294H0.848094C0.775549 2.14294 0.733139 2.22553 0.775549 2.28469L4.71082 7.70991C4.85367 7.90634 5.14608 7.90634 5.28783 7.70991L9.22309 2.28469C9.26662 2.22553 9.22421 2.14294 9.15167 2.14294Z" />
    </Icon>
  )
}
