import type { FC, ReactNode } from 'react'

export const Panel: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="h-[calc(100vh-48px)] w-full overflow-hidden bg-[#E3EAEF]">
      <div className="m-2 h-[calc(100vh-48px-16px)] w-[calc(100%-16px)] overflow-hidden rounded-[4px] border border-[#D8DFE6] bg-white p-4">
        {children}
      </div>
    </div>
  )
}
