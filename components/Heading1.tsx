import { ReactNode } from 'react'

interface IProps {
  children: ReactNode
}

const Heading1 = ({ children }: IProps) => {
  return (
    <h1 className="text-4xl font-semibold text-gray-800 dark:text-white">
      {children}
    </h1>
  )
}

export default Heading1
