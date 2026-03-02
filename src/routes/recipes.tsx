import { getBaseUrl } from '~/lib/url'
import { createResource, For } from 'solid-js'
import Button from '~/components/Button'
import RecipeCard from '~/components/RecipeCard'
import { RecipeWithContent } from '~/types/recipe.model'
import './recipes.sass'

export default function Home() {
  const baseUrl = getBaseUrl()
  const getAllRecipes = async (): Promise<
    RecipeWithContent[]
  > => {
    const response = await fetch(`${baseUrl}/api/recipes`)
    return response.json()
  }
  const [recipes] = createResource(getAllRecipes)
  return (
    <div>
      <h1>Recettes</h1>
      <Button>Ajouter</Button>
      <div class="recipes">
        <For each={recipes()}>
          {(recipe) => <RecipeCard recipe={recipe} />}
        </For>
      </div>
    </div>
  )
}
