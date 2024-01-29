import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'

interface IProps {
  children: ReactNode
  href: string
}

const LinkMenu = ({ children, href }: IProps) => {
  const router = useRouter()
  const { pathname } = router
  const selected = pathname === href
  return (
    <Link
      className={`
        my-2 
        flex 
        w-full 
        items-center 
        justify-start 
        border-l-4 
        p-2 
        pl-6 
        transition-colors 
        duration-200 
            ${
              selected
                ? 'border-purple-500 text-gray-800 dark:text-white'
                : 'border-transparent text-gray-400 hover:text-gray-800'
            }
        `}
      href={href}
    >
      {children}
    </Link>
  )
}

export default LinkMenu
