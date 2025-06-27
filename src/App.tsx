// This file is now a placeholder since all the routing and provider logic
// has been moved to main.tsx and router.tsx

import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import './App.css';

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
