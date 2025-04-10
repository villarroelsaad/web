import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import './index.css'
import App from './App'
import { Paypal } from './components/Paypal'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/paypal',
        element: <Paypal />
      },

  
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
 
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
 
)
