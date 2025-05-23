import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import Main from "../Layout/Main";
import Home from "../Components/Home/Home/Home";
import SignUp from "../Components/Home/SignUp/SignUp";
import Login from "../Components/Login/Login";
import Featured from "../Components/Home/Featured/Featured";
import BookClubPage from "../Components/Home/BookClubPage/BookClubPage";
import AllHubby from "../Components/Home/AllHubby/AllHubby";
import CreateGroup from "../Components/Home/CreateGroup/CreateGroup";
import MyGroups from "../Components/Home/MyGroups/MyGroups";
import ErrorPage from "../Components/Home/ErrorPage/ErrorPage";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: 'signup',
        element: <SignUp></SignUp>
      },
      {
        path: 'signIn',
        element: <Login></Login>
      },
      {
        path: 'allHobby',
        element: <PrivateRoute><AllHubby></AllHubby></PrivateRoute>
      },
      {
        path: 'createGroup',
        element: <PrivateRoute><CreateGroup></CreateGroup></PrivateRoute>
      },
      {
        path: 'myGroup/:email',
        loader: ({ params }) => fetch(`http://localhost:5000/menus/${params.email}`),
        element: <PrivateRoute><MyGroups></MyGroups></PrivateRoute>,
      },

        {
        path: 'feature',
        element: <PrivateRoute><Featured></Featured></PrivateRoute>

      },
      {
        path: 'feature/:id',
        loader: ({ params }) => fetch(`http://localhost:5000/menu/${params.id}`),
        element: <PrivateRoute><BookClubPage></BookClubPage></PrivateRoute>,
      },
    ]

  },
]);