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
    <article class="recipe-card">
      <header class="recipe-header">
        <h3>{props.recipe.name}</h3>
      </header>
      <section class="recipe-section">
        <h4>Ingrédients</h4>
        <ul>
          <For each={props.recipe.ingredients}>
            {(ingredient) => (
              <li>
                <span class="name">
                  {ingredient.ingredient.name}
                </span>
                {ingredient.quantity && (
                  <span class="highlight">
                    {ingredient.quantity} {ingredient.unit}
                  </span>
                )}
              </li>
            )}
          </For>
        </ul>
      </section>
      <section class="recipe-section">
        {props.recipe.steps.length > 0 && (
          <h4>Préparation</h4>
        )}
        <ol>
          <For each={props.recipe.steps}>
            {(step) => (
              <li>
                <span class="highlight">{step.order}</span>{' '}
                <span>{step.description}</span>
              </li>
            )}
          </For>
        </ol>
      </section>
    </article>
  )
}

export default RecipeCard
