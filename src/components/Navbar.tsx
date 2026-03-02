import { For, ParentComponent } from 'solid-js'
import { useNavigate } from '@solidjs/router'
import './Navbar.sass'

interface NavbarProps {
  routes: { name: string; url: string }[]
}
const Navbar: ParentComponent<NavbarProps> = (props) => {
  const navigate = useNavigate()
  return (
    <div class={'container'}>
      <For each={props.routes}>
        {(route) => (
          <div
            onClick={() => navigate(route.url)}
            class={'route'}
          >
            {route.name}
          </div>
        )}
      </For>
    </div>
  )
}

export default Navbar
