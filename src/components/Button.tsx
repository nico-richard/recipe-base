import { JSX, ParentComponent } from 'solid-js'
import './Button.sass'

interface ButtonProps {
  onClick?: () => void
  color?: string
  classes?: string[]
  styles?: JSX.CSSProperties
}
const Button: ParentComponent<ButtonProps> = (props) => {
  return (
    <div
      class={[
        (props.classes ?? []).join(' '),
        'button',
      ].join(' ')}
      onClick={props.onClick}
      style={{
        '--button-bg': props.color ?? 'var(--accent)',
        ...props.styles,
      }}
    >
      {props.children}
    </div>
  )
}

export default Button
