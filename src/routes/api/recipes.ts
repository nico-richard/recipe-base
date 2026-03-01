import { json } from '@solidjs/router'
import { prisma } from '~/prisma/prisma'

export const GET = async () => {
  const recipe = await prisma.recipe.findMany({
    include: {
      ingredients: { include: { ingredient: true } },
      steps: true,
    },
  })
  return json(recipe)
}

export const POST = async ({
  request,
}: {
  request: Request
}) => {
  const body = await request.json()
  const recipe = await prisma.recipe.create({
    data: {
      name: body.name,
      ingredients: {
        create: body.ingredients.map((ingredient: any) => ({
          quantity: ingredient.quantity,
          ingredient: {
            connectOrCreate: {
              where: { name: ingredient.name },
              create: { name: ingredient.name },
            },
          },
        })),
      },
    },
    include: {
      ingredients: { include: { ingredient: true } },
    },
  })
  return json(recipe)
}
