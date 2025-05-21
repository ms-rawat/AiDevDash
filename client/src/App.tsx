import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/Login";
import Reginstration from "./pages/Reginstration";


const router = createBrowserRouter([
    { path : '/', element: <LoginPage/> },
  { path : '/login', element: <LoginPage/> },
  {path :'/register',element:<Reginstration/> }

])


function App(){
  return <RouterProvider router={router}/>
}

export default App