import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './routes/root'
import Dashboard from './routes/dashboard'
import CreateCategory from './routes/createcategory'
import './index.css'
import './routes/root.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />
  },
  {
    path: '/createcategory',
    element: <CreateCategory />
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
