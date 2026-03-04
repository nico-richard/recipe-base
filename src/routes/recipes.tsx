import { getBaseUrl } from '~/lib/url'
import { createResource, createSignal, For } from 'solid-js'
import Button from '~/components/Button'
import RecipeCard from '~/components/RecipeCard'
import { RecipeWithContent } from '~/types/recipe.model'
import './recipes.sass'
import { Portal } from 'solid-js/web'
import { Type } from '@prisma/client'

export default function Recipes() {
  const baseUrl = getBaseUrl()
  const getAllRecipes = async (): Promise<
    RecipeWithContent[]
  > => {
    const response = await fetch(`${baseUrl}/api/recipes`)
    return response.json()
  }
  const getAllTypes = async (): Promise<Type[]> => {
    const response = await fetch(`${baseUrl}/api/types`)
    return response.json()
  }
  const [recipes] = createResource(getAllRecipes)
  const [types] = createResource(getAllTypes)
  const [recipeSearch, setRecipeSearch] = createSignal<
    string | null
  >(null)
  const [displayAddRecipeModal, setDisplayAddRecipeModal] =
    createSignal<boolean>(false)
  const [newIngredients, setNewIngredients] = createSignal<
    { name: string; quantity: number }[]
  >([])
  const [newSteps, setNewSteps] = createSignal<
    { description: string; order: number }[]
  >([])
  const [selectedTypes, setSelectedTypes] = createSignal<
    number[]
  >([])
  setSelectedTypes(types()?.map((type) => type.id) ?? [])

  const handleSearchInputChange = (
    e: InputEvent & {
      currentTarget: HTMLInputElement
      target: HTMLInputElement
    }
  ) => {
    setRecipeSearch(e.currentTarget.value)
  }

  const handleAddIngredient = () => {
    setNewIngredients([
      ...newIngredients(),
      { name: 'ingredient', quantity: 0 },
    ])
  }
  const handleAddStep = () => {
    setNewSteps([
      ...newSteps(),
      { description: 'description', order: 1 },
    ])
  }
  const validateForm = () => {}

  return (
    <div class="recipe-container">
      {displayAddRecipeModal() && (
        <Portal>
          <div
            class="modal-backdrop"
            onClick={() => setDisplayAddRecipeModal(false)}
          >
            <div
              class="modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <h1>Ajout d'une recette</h1>
              <input
                type="text"
                placeholder="Nom de la recette"
                name="name"
              />
              <div class="ingredients">
                <div class="initial">
                  <input
                    type="text"
                    placeholder="Ingrédient"
                    name="name"
                  />
                  <Button
                    onClick={() => handleAddIngredient()}
                  >
                    +
                  </Button>
                </div>
                {newIngredients.length > 0 && (
                  <ul>
                    <For each={newIngredients()}>
                      {(i) => (
                        <div
                          style={{
                            display: 'flex',
                            'justify-content':
                              'space-between',
                          }}
                        >
                          <li>
                            {i.name} : {i.quantity}
                          </li>
                          <span
                            style={{
                              cursor: 'pointer',
                            }}
                            onClick={() =>
                              setNewIngredients(
                                newIngredients().filter(
                                  (ingredient) =>
                                    i.name !==
                                    ingredient.name
                                )
                              )
                            }
                          >
                            X
                          </span>
                        </div>
                      )}
                    </For>
                  </ul>
                )}
              </div>
              <div class="steps">
                <div class="initial">
                  <input
                    type="text"
                    placeholder="Étape"
                    name="name"
                  />
                  <Button onClick={() => handleAddStep()}>
                    +
                  </Button>
                </div>
                {newSteps.length > 0 && (
                  <ol>
                    <For each={newSteps()}>
                      {(s) => (
                        <div
                          style={{
                            display: 'flex',
                            'justify-content':
                              'space-between',
                          }}
                        >
                          <li>
                            {s.order} - {s.description}
                          </li>
                          <span
                            style={{
                              cursor: 'pointer',
                            }}
                            onClick={() =>
                              setNewSteps(
                                newSteps().filter(
                                  (step) =>
                                    s.description !==
                                    step.description
                                )
                              )
                            }
                          >
                            X
                          </span>
                        </div>
                      )}
                    </For>
                  </ol>
                )}
              </div>
              <div class="buttons">
                <Button
                  onClick={() =>
                    setDisplayAddRecipeModal(false)
                  }
                  color="var(--danger)"
                >
                  Annuler
                </Button>
                <Button
                  onClick={() => {
                    setDisplayAddRecipeModal(false)
                    validateForm()
                  }}
                >
                  Valider
                </Button>
              </div>
            </div>
          </div>
        </Portal>
      )}
      <h1 class={'title'}>Recettes</h1>
      <Button
        classes={['add-recipe-button']}
        onClick={() => setDisplayAddRecipeModal(true)}
      >
        Ajouter
      </Button>
      <input
        class="search-recipe"
        type="text"
        placeholder="Rechercher une recette..."
        onInput={(e) => handleSearchInputChange(e)}
      />
      <div class="types">
        <For each={types()}>
          {(t) => (
            <Button
              styles={{
                'background-color':
                  selectedTypes()?.includes(t.id)
                    ? 'var(--bg-main)'
                    : 'var(--bg-elevated)',
              }}
              onClick={() => {
                if (!selectedTypes()?.includes(t.id)) {
                  setSelectedTypes([
                    ...(selectedTypes() ?? []),
                    t.id,
                  ])
                } else {
                  setSelectedTypes(
                    selectedTypes()?.filter(
                      (tId) => t.id !== tId
                    ) ?? []
                  )
                }
              }}
            >
              {t.name}
            </Button>
          )}
        </For>
      </div>
      <div class="recipes">
        <For
          each={recipes()
            ?.filter((r) => {
              if (!r.type) return true
              return selectedTypes().includes(r.type.id)
            })
            .filter((r) => {
              return (
                !recipeSearch() ||
                r.name
                  .toLowerCase()
                  .includes(recipeSearch()!.toLowerCase())
              )
            })}
        >
          {(recipe) => <RecipeCard recipe={recipe} />}
        </For>
      </div>
    </div>
  )
}
