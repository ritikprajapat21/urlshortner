import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/login.tsx";
import ContentCenter from "./components/ContentCenter.tsx";
import SignUpPage from "./pages/signup.tsx";
import Urls from "./pages/urls.tsx";
import Create from "./pages/create.tsx";
import Delete from "./pages/delete.tsx";
import Edit from "./pages/edit.tsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <SignUpPage /> },
  {
    path: "/urls",
    element: <Urls />,
    children: [
      {
        path: "/urls/delete",
        element: <Delete />,
      },
      {
        path: "/urls/edit",
        element: <Edit />,
      },
      { path: "/urls/create", element: <Create /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ContentCenter>
      <RouterProvider router={router} />
    </ContentCenter>
  </StrictMode>,
);
