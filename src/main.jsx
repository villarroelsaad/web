import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import './index.css'
import App from './App'
import { UserProvider } from "./services/context";
import { Paypal } from "./components/Paypal";
import { Sales } from "./components/Sales";
import { Login } from "./components/Login";
import { Clients } from "./components/Clients";
import { Config } from "./components/Config";

const router = createBrowserRouter([
  {
    path: "/home",
    element: <App />,
    children: [
      {
        path: "/home/paypal",
        element: <Paypal />,
      },
      {
        path: "/home/sales",
        element: <Sales />,
      },
      {
        path: "/home/clients",
        element: <Clients />,
      },
      {
        path: "/home/config",
        element: <Config />,
      },
    ],
  },
  {
    path: "/",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserProvider>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </UserProvider>
);
