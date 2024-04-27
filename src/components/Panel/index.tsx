import type { FC, ReactNode } from 'react'
import { PanelHeader } from '../PanelHeader'

export const Panel: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="h-[calc(100vh-48px)] w-full overflow-hidden bg-[#E3EAEF]">
      <div className="border-card m-2 h-[calc(100vh-48px-16px)] w-[calc(100%-16px)] overflow-hidden rounded-[4px] border bg-white p-4">
        <PanelHeader />
        {children}
      </div>
    </div>
  )
}
