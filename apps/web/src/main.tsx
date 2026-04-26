import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AdminPage } from "./pages/AdminPage";
import { DashboardPage } from "./pages/DashboardPage";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { OpportunitiesPage } from "./pages/OpportunitiesPage";
import { ReviewResultsPage } from "./pages/ReviewResultsPage";
import { SessionDetailPage } from "./pages/SessionDetailPage";
import { VolunteerPage } from "./pages/VolunteerPage";
import { AppShell } from "./ui/AppShell";
import "./styles.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppShell />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "sessions", element: <OpportunitiesPage /> },
      { path: "sessions/:sessionId", element: <SessionDetailPage /> },
      { path: "volunteer", element: <VolunteerPage /> },
      { path: "resume-review", element: <DashboardPage /> },
      { path: "review-results", element: <ReviewResultsPage /> },
      { path: "review-results/:reviewId", element: <ReviewResultsPage /> },
      { path: "admin", element: <AdminPage /> },
      { path: "*", element: <NotFoundPage /> }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
