import { For, ParentComponent } from 'solid-js'
import './RecipeCard.sass'
import { RecipeWithContent } from '~/types/recipe.model'

interface RecipeProps {
  recipe: RecipeWithContent
}

const RecipeCard: ParentComponent<RecipeProps> = (
  props
) => {
  return (
    <div class={'recipe'}>
      <h3>{props.recipe.name}</h3>
      <div class="ingredients">
        <For each={props.recipe.ingredients}>
          {(ingredient) => (
            <p>
              {ingredient.ingredient.name}
              {ingredient.quantity && ' : '}
              {ingredient.quantity} {ingredient.unit}
            </p>
          )}
        </For>
      </div>
      <div class="steps">
        <For each={props.recipe.steps}>
          {(step) => (
            <p>
              {step.order} - {step.description}
            </p>
          )}
        </For>
      </div>
    </div>
  )
}

export default RecipeCard
