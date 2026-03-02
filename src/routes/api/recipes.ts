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
  const existing = await prisma.recipe.findFirst({
    where: { name: body.name },
  })
  if (existing) {
    return json(
      { error: 'Une recette avec ce nom existe déjà' },
      { status: 409 }
    )
  }
  const recipe = await prisma.recipe.create({
    data: {
      name: body.name,
      ingredients: {
        create: body.ingredients.map((ingredient: any) => ({
          ...(ingredient.quantity !== undefined && {
            quantity: ingredient.quantity,
          }),
          ...(ingredient.unit !== undefined && {
            unit: ingredient.unit,
          }),
          ingredient: {
            connectOrCreate: {
              where: { name: ingredient.name },
              create: { name: ingredient.name },
            },
          },
        })),
      },
      steps: {
        create: body.steps.map((step: any) => ({
          ...(step.order !== undefined && {
            order: step.order,
          }),
          ...(step.description !== undefined && {
            description: step.description,
          }),
        })),
      },
    },
    include: {
      ingredients: { include: { ingredient: true } },
    },
  })
  return json(recipe)
}
