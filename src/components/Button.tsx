import { ParentComponent } from 'solid-js'
import './Button.sass'

interface ButtonProps {
  onClick?: () => void
  color?: string
}
const Button: ParentComponent<ButtonProps> = (props) => {
  return (
    <div
      class="button"
      onClick={props.onClick}
      style={
        {
          '--button-bg': props.color ?? 'var(--accent)',
        } as any
      }
    >
      {props.children}
    </div>
  )
}

export default Button
