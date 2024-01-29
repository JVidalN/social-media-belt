import { ReactNode } from 'react'

interface IProps {
  children: ReactNode
}

const LayoutTenant = ({ children }: IProps) => {
  return (
    <>
      <h1>Tenant Layout</h1>
      {children}
    </>
  )
}

export default LayoutTenant
