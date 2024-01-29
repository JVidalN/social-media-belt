import { getSession } from 'next-auth/react'
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'

type LinkData = {
  id?: string
  success: boolean
}

export default async (req: NextApiRequest, res: NextApiResponse<LinkData>) => {
  const session = await getSession({ req })

  if (session) {
    const tenantId = String(req.query.tenantId)
    const linkId = String(req.query.linkId)

    if (req.method === 'DELETE') {
      const linkData = {
        name: req.body.name,
        publicName: req.body.publicName,
        slug: req.body.slug,
        destination: req.body.destination,
        tenantId,
      }

      await prisma.link.delete({
        where: {
          id: linkId,
        },
      })
      return res.send({ id: linkId, success: true })
    }
    return res.send({ id: linkId, success: false })
  } else {
    return res.send({ success: false })
  }
}
