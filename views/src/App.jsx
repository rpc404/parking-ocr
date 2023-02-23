import React from 'react'
import {
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";

import Checkout from './pages/checkout';
import Home from './pages/home';
import Record from './pages/record';

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/record",
      element: <Record />,
    },
    {
      path: "/checkout",
      element: <Checkout />,
    },
  ]
);
export default function App() {
  return (
    <RouterProvider router={router} />
  )
}