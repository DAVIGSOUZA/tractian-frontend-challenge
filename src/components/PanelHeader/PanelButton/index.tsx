import type { FC, ReactNode } from 'react'

type PanelButtonProps = {
  label: string
  onClick: () => void
  icon: ReactNode
  isActive?: boolean
}

export const PanelButton: FC<PanelButtonProps> = ({
  label,
  onClick,
  icon,
  isActive = false,
}) => {
  return (
    <button
      className={`flex items-center rounded-[3px] border px-4 py-[6px] ${isActive ? 'border-blue-500 bg-blue-500' : 'border-card '}`}
      onClick={onClick}
    >
      {icon}
      <span
        className={`ml-2 text-sm font-semibold  ${isActive ? 'text-white' : 'text-[#77818C]'}`}
      >
        {label}
      </span>
    </button>
  )
}
