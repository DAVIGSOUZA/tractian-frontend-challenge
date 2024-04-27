import type { FC } from 'react'
import { Icon } from '@/icons/Icon'
import type { IconProps } from '@/icons/types'

export const Logo: FC<Pick<IconProps, 'className'>> = ({ className }) => {
  return (
    <Icon width={177} height={25} viewBox="0 0 177 25" className={className}>
      <path d="M62.458 0.843088L72.7058 23.9849H65.8867L64.0604 19.4754L62.16 14.6309L59.1789 7.21453L56.1977 14.6309L54.2973 19.4754L52.471 23.9849H45.7631L56.011 0.843088H62.458ZM42.4099 13.8112C43.1926 12.5437 43.6018 11.0909 43.6018 9.41432C43.6018 7.7377 43.1541 6.1723 42.3344 4.8678C41.4775 3.56331 40.2842 2.59523 38.7573 1.88669C37.1919 1.17814 35.3656 0.843088 33.3169 0.843088H22.734V5.98555H32.9077C34.2122 5.98555 35.2558 6.28353 35.9629 6.87948C36.6344 7.47543 37.0065 8.33227 37.0065 9.37587C37.0065 10.4195 36.6344 11.2763 35.9629 11.8723C35.2544 12.4682 34.2492 12.7291 32.9077 12.7291H22.734V23.9464H29.2921V17.7974H32.8692L37.0807 23.9464H44.0865L39.0566 16.7181C40.4724 16.0096 41.5901 15.0786 42.4099 13.8112ZM176.492 0.843088H170.082L170.045 7.4768L176.455 15.2283L176.492 0.843088ZM81.3869 6.54443C82.3934 6.02263 83.5112 5.72465 84.7786 5.72465C86.9029 5.72465 88.7292 6.65565 90.219 8.44487L94.3934 4.68106C93.2757 3.30241 91.8599 2.18466 90.1449 1.43904C88.4312 0.693414 86.5307 0.321289 84.4065 0.321289C81.9471 0.321289 79.7858 0.843088 77.8483 1.88669C75.9478 2.93028 74.4195 4.34601 73.3018 6.13523C72.184 7.9986 71.6622 10.0487 71.6622 12.3584C71.6622 14.668 72.184 16.7552 73.3018 18.5815C74.4195 20.3707 75.9478 21.7864 77.8483 22.793C79.7487 23.8366 81.9471 24.3213 84.4065 24.3213C86.5307 24.3213 88.3941 23.9492 90.1449 23.2035C91.8215 22.4579 93.2386 21.3772 94.3934 19.9615L90.219 16.1977C88.6907 18.024 86.8644 18.9179 84.7786 18.9179C83.5112 18.9179 82.3934 18.657 81.3869 18.0982C80.3804 17.5764 79.6348 16.7937 79.1143 15.7871C78.5939 14.7806 78.3316 13.6258 78.3316 12.3213C78.3316 11.0168 78.5925 9.86197 79.1143 8.89252C79.6361 7.886 80.4188 7.1033 81.3869 6.54443ZM0 6.02263H7.11844V23.9849H13.6766V6.02263H20.7566V0.843088H0V6.02263ZM154.505 23.9849H160.915L160.952 17.0532L154.542 8.89252L154.505 23.9849ZM136.356 0.843088L126.145 23.9849H132.816L134.642 19.4754L136.542 14.6309L139.524 7.21453L142.505 14.6309L144.405 19.4754L146.231 23.9849H153.05L142.803 0.843088H136.356ZM170.082 13.1781L159.871 0.843088H154.468V3.93543L160.877 11.6869L171.088 24.0219H176.492V21.3388L170.082 13.1781ZM118.133 23.9849H124.691V0.843088H118.133V23.9849ZM95.437 6.02263H102.518V23.9849H109.077V6.02263H116.157V0.843088H95.437V6.02263Z"></path>
    </Icon>
  )
}