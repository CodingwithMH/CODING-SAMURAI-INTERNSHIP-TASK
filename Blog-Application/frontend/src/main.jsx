import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import routes from './routes/Providers.jsx'
import { UserProvider } from './contexts/UserContext.jsx'
import { PostsProvider } from './contexts/PostsContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <PostsProvider>

    <RouterProvider router={routes} />
      </PostsProvider>
    </UserProvider>
  </StrictMode>
)
