// Import necessary modules from React and React Router
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router";

/* ************************************************************************* */

// Import the main app component
import App from "./App";
import GameDetail from "./components/GameDetail";
import GenreDetails from "./components/GenreDetails";
import Mention from "./components/MentionLegal";
import Page404 from "./components/Page404";

// Import additional components for new routes
// Try creating these components in the "pages" folder

// import About from "./pages/About";
// import Contact from "./pages/Contact";

/* ************************************************************************* */

// Create router configuration with routes
// You can add more routes as you build out your app!
const router = createBrowserRouter([
  {
    path: "/genre/:id",
    element: <GenreDetails />,
  },

  {
    path: "/", // The root path
    element: <App />, // Renders the App component for the home page
  },

  {
    path: "/mentions-legales",
    element: <Mention />,
  },

  {
    path: "/jeu/:id",
    element: <GameDetail />,
  },

  {
    path: "/*",
    element: <Page404 />,
  },
  // Try adding a new route! For example, "/about" with an About component
]);

/* ************************************************************************* */

// Find the root element in the HTML document
const rootElement = document.getElementById("root");
if (rootElement == null) {
  throw new Error(`Your HTML Document should contain a <div id="root"></div>`);
}

// Render the app inside the root element
createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
