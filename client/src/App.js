
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import { ContextProvider } from "./contexts/ContextProvider";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";


const Layout = () => {
  return(
    <>
        <Navbar/>
        <Outlet/>
      
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (<Layout/>),
    children:[
      {
          path: "/",
          element: (<Home/>)
      },
    ]
  },
  {
    path: "/register",
    element: (<Register/>),
  },
  {
    path: "/login",
    element: (<Login/>),
  },
]);


function App() {
  return (
    <div className="App">
         <div>
          <ContextProvider>
            <RouterProvider router={router} />
          </ContextProvider>
        
        </div>
    </div>
  );
}

export default App;
