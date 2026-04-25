import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppShell } from "./ui/AppShell";
import { DashboardPage } from "./pages/DashboardPage";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { OpportunitiesPage } from "./pages/OpportunitiesPage";
import "./styles.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppShell />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "sessions", element: <OpportunitiesPage /> },
      { path: "resume-review", element: <DashboardPage /> },
      { path: "*", element: <NotFoundPage /> }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
