import { createBrowserRouter } from "react-router-dom";
import Main from "../Main/Main";
import Home from "../Pages/Home/Home";
import Form from '../Form'
import Form2 from "../Form2";
import Allblog from "../Pages/Home/blogpage/Allblog";
import Addblog from "../Pages/Home/blogpage/Addblog";
export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
         
      children: [
         { path:"/",
         element:<Home></Home>
         

 

         },
         {
          path:"/allblog",
          element:<Allblog></Allblog>




         },
         {

         path:"/addblogs",
         element:<Addblog></Addblog>


         },

      ],
    
    },

    {
      path: "/register",
      element: <Form />, // Use RegisterLayout
    },
    {
      path: "/login",
      element: <Form2 />, // Use RegisterLayout
    },
  ]);