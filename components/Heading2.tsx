import { ReactNode } from 'react'

interface IProps {
  children: ReactNode
}

const Heading2 = ({ children }: IProps) => {
  return <h2 className="text-md text-gray-400">{children}</h2>
}

export default Heading2
