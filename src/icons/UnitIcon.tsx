import type { FC } from 'react'
import { Icon } from './Icon'
import type { IconProps } from './types'

export const UnitIcon: FC<IconProps> = (props) => {
  return (
    <Icon width={14} height={14} viewBox="0 0 14 14" {...props}>
      <path d="M4.34381 6.37402H9.68756C9.69381 6.37402 9.70162 6.37402 9.70787 6.37246C9.77662 6.36152 9.82194 6.29746 9.811 6.22871L9.18287 2.35371C9.1735 2.29277 9.12037 2.24902 9.05943 2.24902H4.97193C4.911 2.24902 4.85787 2.29277 4.8485 2.35371L4.22037 6.22871C4.21881 6.23496 4.21881 6.24277 4.21881 6.24902C4.21881 6.31777 4.27506 6.37402 4.34381 6.37402ZM5.76881 3.31152H8.261L8.58444 5.31152H5.44381L5.76881 3.31152ZM5.80787 7.72871C5.7985 7.66777 5.74537 7.62402 5.68443 7.62402H1.59693C1.536 7.62402 1.48287 7.66777 1.4735 7.72871L0.845372 11.6037C0.843809 11.61 0.843809 11.6178 0.843809 11.624C0.843809 11.6928 0.900059 11.749 0.968809 11.749H6.31256C6.31881 11.749 6.32662 11.749 6.33287 11.7475C6.40162 11.7365 6.44693 11.6725 6.436 11.6037L5.80787 7.72871ZM2.07037 10.6865L2.39381 8.68652H4.886L5.20943 10.6865H2.07037ZM13.1547 11.6037L12.5266 7.72871C12.5172 7.66777 12.4641 7.62402 12.4032 7.62402H8.31569C8.25475 7.62402 8.20162 7.66777 8.19225 7.72871L7.56412 11.6037C7.56256 11.61 7.56256 11.6178 7.56256 11.624C7.56256 11.6928 7.61881 11.749 7.68756 11.749H13.0313C13.0376 11.749 13.0454 11.749 13.0516 11.7475C13.1188 11.7365 13.1657 11.6725 13.1547 11.6037ZM8.78912 10.6865L9.11256 8.68652H11.6047L11.9282 10.6865H8.78912Z" />
    </Icon>
  )
}