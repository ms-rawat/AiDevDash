import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/auth/Login";
import Reginstration from "./pages/auth/Reginstration";
import Dashboard from "./pages/dashboard/Dashboard";
import { type RootState } from "./Redux/Store";
import Layout from "./layouts/Layout";
import ProjectsOverview from "./pages/Projects/ProjectsOverview";
import NewProject from "./pages/Projects/ProjectForm";
import ProjectDetails from "./pages/Projects/ProjectDetails";
import NewTask from "./pages/tasks/NewTask";
import TaskDetail from "./pages/tasks/TaskDetail";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "./Redux/ReduxSlices/themeSlice";
import ScreenSizeListener from "./services/ScreenSizeListener";
import ProjectForm from "./pages/Projects/ProjectForm";
import AllProjects from "./pages/Projects/AllProjects";

const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <Reginstration /> },
  {
    path: "/",
    element: <Layout />,
    children: [
      // Default route for '/'
      {
        index: true, // Renders this component when the path is exactly '/'
        element: <Dashboard />, // Your main dashboard/home page
      },
      {
        path: "dashboard", // this matches "/dashboard"
        element: <Dashboard />,
      },
       {
        path: 'AllProjects',
        element: <AllProjects/>
      },
      {
        path: 'ProjectForm',
        element: <ProjectForm/>
      },
      // Auth Routes
      {
        path: "auth/*", // Use '*' for nested auth routes if Auth component handles them
        element: <>auth</>,
      },
      // Other top-level routes (placeholders for now)
      {
        path: "github",
        element: <>github</>,
      },
      {
        path: "notifications",
        element: <>notifications</>,
      },
      {
        path: "settings",
        element: <>settings</>,
      },
      {
        path: "snippets",
        element: <>snippets</>,
      },
      {
        path: "ai-assistant",
        element: <>ai-assistant</>,
      },

      // --- Task Management Routes ---
      {
        path: "tasks",
        element: <Outlet />, // This allows nested routes to render within ProjectDetails/TaskDetail
        children: [
          {
            index: true, // Renders ProjectsOverview when path is exactly '/tasks'
            element: <ProjectsOverview />,
          },
          {
            path: "new-project",
            element: <NewProject />,
          },
          {
            path: ":projectId", // Dynamic segment for Project ID (e.g., /tasks/123)
            element: <ProjectDetails />, // Shows project details and its tasks
            children: [
              // Nested routes specific to a project's tasks
              {
                path: "new-task", // Route: /tasks/:projectId/new-task
                element: <NewTask />,
              },
              {
                path: ":taskId", // Route: /tasks/:projectId/:taskId (e.g., /tasks/123/456)
                element: <TaskDetail />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

function App() {
  const themeMode = useSelector((state: RootState) => state.theme.mode);
  console.log(themeMode); // This is good for debugging
  const dispatch = useDispatch();

  // Load theme from localStorage on first load
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark" || savedTheme === "light") {
      dispatch(setTheme(savedTheme));
    } else {
      // Optional: detect system preference if no theme saved
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      dispatch(setTheme(prefersDark ? "dark" : "light"));
    }
  }, [dispatch]);

  // THIS IS THE CRITICAL PART FOR APPLYING THE 'dark' CLASS
  useEffect(() => {
    if (themeMode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [themeMode]); // Re-run this effect whenever themeMode changes

  return (
    <>
      <ScreenSizeListener />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
