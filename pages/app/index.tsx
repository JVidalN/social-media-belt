import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useGet } from '../../hooks/api'

const AppIndex = () => {
  const router = useRouter()
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const { data: session } = useSession()
  const { data } = useGet('/api/tenants')

  useEffect(() => {
    if (data && data.length === 1) {
      setShouldRedirect(true)
    }
  }, [data])

  useEffect(() => {
    if (shouldRedirect) {
      setTimeout(() => {
        router.push(`/app/${data[0].id}`)
      }, 3000)
      setShouldRedirect(false)
    }
  }, [shouldRedirect])

  return (
    <div className="m-6 mx-auto max-w-lg text-center">
      <img
        src={session?.user?.image}
        alt={session?.user?.name}
        className="inline-block w-16 rounded-full"
      />
      <h1>{session?.user?.name}</h1>
      <div className="mt-6">
        {data &&
          data.length > 1 &&
          data.map((tenant) => (
            <Link
              href={`/app/${tenant.id}`}
              className="
                inline-block
                w-full
                rounded-md
                border 
                bg-white 
                px-4 
                py-2 
                text-center 
                text-base 
                font-medium
                text-black
                hover:bg-gray-100
              "
            >
              {tenant.name}
            </Link>
          ))}
      </div>
      <div className="bg-blue-100">
        <svg
          width={38}
          height={38}
          viewBox="0 0 38 38"
          xmlns="http://www.w3.org/2000/svg"
          className="fill-blue-500"
        >
          <defs>
            <linearGradient
              x1="8.042%"
              y1="0%"
              x2="65.682%"
              y2="23.865%"
              id="a"
            >
              <stop stopColor="#fff" stopOpacity={0} offset="0%" />
              <stop stopColor="#fff" stopOpacity=".631" offset="63.146%" />
              <stop stopColor="#fff" offset="100%" />
            </linearGradient>
          </defs>
          <g fill="none" fillRule="evenodd">
            <g transform="translate(1 1)">
              <path
                d="M36 18c0-9.94-8.06-18-18-18"
                id="Oval-2"
                stroke="url(#a)"
                strokeWidth={2}
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 18 18"
                  to="360 18 18"
                  dur="0.9s"
                  repeatCount="indefinite"
                />
              </path>
              <circle fill="#fff" cx={36} cy={18} r={1}>
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 18 18"
                  to="360 18 18"
                  dur="0.9s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          </g>
        </svg>
      </div>
    </div>
  )
}

export default AppIndex
