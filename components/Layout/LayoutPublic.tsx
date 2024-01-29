import { ReactNode } from 'react'

interface IProps {
  children: ReactNode
}

const LayoutPublic = ({ children }: IProps) => {
  return (
    <>
      <h1>Public Layout</h1>
      {children}
    </>
  )
}

export default LayoutPublic
