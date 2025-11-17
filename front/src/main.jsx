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
import { Panel } from "./components/Panel";
import { Clients } from "./components/Clients";
import { Config } from "./components/Config";
import { RequireAuth, RequireAuthAdmin } from "./components/auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: (
      <RequireAuth>
        <App />
      </RequireAuth>
    ),
    children: [
      {
        path: "/home/paypal",
        element: <Paypal />,
      },
      {
        path: "/home/panel",
        element: <Panel />,
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
        element: (
          <RequireAuthAdmin>
            <Config />
          </RequireAuthAdmin>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserProvider>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </UserProvider>
);
