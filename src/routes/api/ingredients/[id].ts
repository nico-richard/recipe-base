import { json } from '@solidjs/router'
import { prisma } from '~/prisma/prisma'

export const GET = async ({
  params,
}: {
  params: { id: string }
}) => {
  const ingredient = await prisma.ingredient.findUnique({
    where: { id: Number(params.id) },
  })
  if (!ingredient) {
    return json(
      { error: 'Ingredient not found' },
      { status: 404 }
    )
  }
  return json(ingredient)
}

export const PUT = async ({
  params,
  request,
}: {
  request: Request
  params: { id: string }
}) => {
  const body = await request.json()
  const ingredient = await prisma.ingredient.update({
    where: { id: Number(params.id) },
    data: body,
  })
  return json(ingredient)
}

export const DELETE = async ({
  params,
}: {
  params: { id: string }
}) => {
  await prisma.ingredient.delete({
    where: { id: Number(params.id) },
  })
  return json({ success: true })
}
