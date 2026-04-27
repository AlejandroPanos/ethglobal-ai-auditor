import { createBrowserRouter, RouterProvider } from "react-router";
import PublicLayout from "./layouts/PublicLayout";

// Import Pages
import HomePage from "./pages/HomePage";
import DownloadPage from "./features/reports/pages/DownloadPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "download", element: <DownloadPage /> },
    ],
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
