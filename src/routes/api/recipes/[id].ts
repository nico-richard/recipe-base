import { json } from '@solidjs/router'
import { prisma } from '~/prisma/prisma'

export const GET = async ({
  params,
}: {
  params: { id: string }
}) => {
  const recipe = await prisma.recipe.findUnique({
    where: { id: Number(params.id) },
    include: {
      ingredients: { include: { ingredient: true } },
      steps: true,
    },
  })
  if (!recipe) {
    return json(
      { error: 'Recipe not found' },
      { status: 404 }
    )
  }
  return json(recipe)
}

export const PUT = async ({
  params,
  request,
}: {
  request: Request
  params: { id: string }
}) => {
  const body = await request.json()
  const recipeId = Number(params.id)

  await prisma.recipeIngredient.deleteMany({
    where: { recipeId },
  })

  await prisma.recipe.update({
    where: { id: recipeId },
    data: { name: body.name },
  })

  const updatedRecipe = await prisma.recipe.update({
    where: { id: recipeId },
    data: {
      ingredients: {
        create: body.ingredients.map((ingredient: any) => ({
          quantity: ingredient.quantity,
          unit: ingredient.unit,
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

  return json(updatedRecipe)
}

export const DELETE = async ({
  params,
}: {
  params: { id: string }
}) => {
  await prisma.recipe.delete({
    where: { id: Number(params.id) },
  })
  return json({ success: true })
}
