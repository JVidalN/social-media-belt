import { getSession } from 'next-auth/react'
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'

type TenantData = {
  id: string
  name: string
  slug: string
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse<TenantData[]>,
) => {
  const session = await getSession({ req })

  if (session) {
    const tenants = await prisma.tenant.findMany({
      where: {
        users: {
          some: {
            // @ts-ignore
            userId: session.user.id,
          },
        },
      },
    })
    res.send(tenants)
  } else {
    res.send([])
  }
}
