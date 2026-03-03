import { json } from '@solidjs/router'
import { prisma } from '~/prisma/prisma'
import { createRecipes } from '~/services/recipe.service'

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
  const createdRecipes = await createRecipes(body)
  return json(createdRecipes)
}
