import { prisma } from '~/prisma/prisma'

export const createRecipes = async (body: any) => {
  const recipes = Array.isArray(body) ? body : [body]
  const createdRecipes = []
  for (const recipe of recipes) {
    createdRecipes.push(await createSingleRecipe(recipe))
  }
}

const createSingleRecipe = async (recipe: any) => {
  const existing = await prisma.recipe.findFirst({
    where: { name: recipe.name },
  })
  if (existing) {
    throw new Error(
      `Recipe with name "${recipe.name}" already exists`
    )
  }
  return prisma.recipe.create({
    data: {
      name: recipe.name,
      ingredients: {
        create: mapIngredients(recipe),
      },
      steps: {
        create: recipe.steps,
      },
    },
    include: {
      ingredients: { include: { ingredient: true } },
      steps: true,
    },
  })
}

const mapIngredients = (recipe: any) => {
  return recipe.ingredients.map((ingredient: any) => ({
    quantity: ingredient.quantity,
    unit: ingredient.unit,
    ingredient: {
      connectOrCreate: {
        where: { name: ingredient.name },
        create: { name: ingredient.name },
      },
    },
  }))
}
