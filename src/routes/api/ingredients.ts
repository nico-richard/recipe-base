import { json } from '@solidjs/router'
import { prisma } from '~/prisma/prisma'

export const GET = async () => {
  const ingredients = await prisma.ingredient.findMany()
  return json(ingredients)
}

export const POST = async ({
  request,
}: {
  request: Request
}) => {
  const body = await request.json()
  const ingredient = await prisma.ingredient.create({
    data: {
      name: body.name,
    },
  })
  return json(ingredient)
}
