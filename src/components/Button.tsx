import { ParentComponent } from 'solid-js'
import './Button.sass'

interface ButtonProps {}
const Button: ParentComponent<ButtonProps> = (props) => {
  return <div class={'button'}>{props.children}</div>
}

export default Button
