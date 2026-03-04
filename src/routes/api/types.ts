import { json } from '@solidjs/router'
import { prisma } from '~/prisma/prisma'

export const GET = async () => {
  const types = await prisma.type.findMany()
  return json(types)
}
