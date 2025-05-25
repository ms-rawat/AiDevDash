import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/auth/Login";
import Reginstration from "./pages/auth/Reginstration";
import Dashboard from "./pages/dashboard/Dashboard";
import { Provider } from "react-redux";
import { store } from "./Redux/Store";


const router = createBrowserRouter([
    { path : '/', element: <LoginPage/> },
  { path : '/login', element: <LoginPage/> },
  {path :'/register',element:<Reginstration/> },
  {path :'/dashboard',element:<Dashboard/> }

])


function App(){
  return    <Provider store={store} > <RouterProvider router={router}/></Provider>

}

export default App