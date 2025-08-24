import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Favorite from './pages/Favorite';
import Detail from './pages/Detail';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "favorite", element: <Favorite /> },
      { path: "book/:id", element: <Detail />}
    ],
  },
]
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
