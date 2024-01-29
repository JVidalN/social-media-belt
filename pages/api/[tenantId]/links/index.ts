import { getSession } from 'next-auth/react'
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'

type LinkData = {
  id: string
  name: string
  slug: string
}

type LinkPaginatioWrapper = {
  cursor: string
  take: number
  items: LinkData[]
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse<LinkPaginatioWrapper>,
) => {
  const session = await getSession({ req })

  if (session) {
    const tenantId = String(req.query.tenantId)
    if (req.method === 'POST') {
      console.log(req.body)
      console.log(req.query.tenantId)
      const linkData = {
        name: req.body.name,
        publicName: req.body.publicName,
        slug: req.body.slug,
        destination: req.body.destination,
        tenantId,
      }

      // TODO: Checar se tenho acesso ao tenant
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
      const savedLink = await prisma.link.create({
        data: linkData,
      })
      return res.send(savedLink)
    }
    const links = await prisma.link.findMany({
      take: 4,
      skip: 1,
      cursor: {
        id: '',
      },
      where: {
        tenantId: {
          equals: tenantId,
        },
      },
      orderBy: {
        id: 'asc',
      },
    })
    return res.send({
      cursor: '',
      take: 10,
      items: links,
    })
  } else {
    res.send({})
  }
}
