import { Router } from '@solidjs/router'
import { FileRoutes } from '@solidjs/start/router'
import { Suspense } from 'solid-js'
import './app.sass'
import Navbar from '~/components/Navbar'

export default function App() {
  return (
    <Router
      root={(props) => (
        <>
          <Navbar
            routes={[
              { name: 'Accueil', url: '/' },
              { name: 'Recettes', url: '/recipes' },
            ]}
          ></Navbar>
          <Suspense>{props.children}</Suspense>
        </>
      )}
    >
      <FileRoutes />
    </Router>
  )
}
