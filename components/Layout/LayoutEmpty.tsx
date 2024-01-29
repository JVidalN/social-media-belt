import { ReactNode } from 'react'

interface IProps {
  children: ReactNode
}

const LayoutEmpty = ({ children }: IProps) => {
  return <>{children}</>
}

export default LayoutEmpty
