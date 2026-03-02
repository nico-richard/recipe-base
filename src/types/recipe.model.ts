import { Prisma } from '@prisma/client'

export type RecipeWithContent = Prisma.RecipeGetPayload<{
  include: {
    ingredients: { include: { ingredient: true } }
    steps: true
  }
}>
