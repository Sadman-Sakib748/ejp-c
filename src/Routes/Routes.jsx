import { createBrowserRouter } from "react-router"; // ✅ use react-router-dom, not react-router
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
import Support from "../Components/Home/Support/Support";
import AboutUs from "../Components/Home/AboutUs/AboutUs";
import Contact from "../Components/Home/Contact/Contact";
import HelpCenter from "../Components/Shared/Footer/HelpCenter/HelpCenter";
import CommunityGuidelines from "../Components/Shared/Footer/CommunityGuidelines/CommunityGuidelines";
import Blog from "../Components/Shared/Footer/Blog/Blog";
import PrivacyPolicy from "../Components/Shared/Footer/PrivacyPolicy/PrivacyPolicy";
import TermsOfService from "../Components/Shared/Footer/TermsOfService/TermsOfService";
import CookiePolicy from "../Components/Shared/Footer/CookiePolicy/CookiePolicy";
import DashboardHome from "../Components/Shared/DashboardHome/DashboardHome";
import Dashbordlyout from "../Components/Shared/Dashbord/Dashbordlyout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "signup", element: <SignUp /> },
      { path: "signIn", element: <Login /> },
      { path: "about", element: <AboutUs /> },
      { path: "support", element: <Support /> },
      { path: "contact", element: <Contact /> },
      { path: "helpCenter", element: <HelpCenter /> },
      { path: "communityGuidelines", element: <CommunityGuidelines /> },
      { path: "blog", element: <Blog /> },
      {
        path: "feature/:id",
        loader: ({ params }) =>
          fetch(`https://ejp-s-sadmansakib34523-gmailcoms-projects.vercel.app/menu/${params.id}`),
        element: (
          <PrivateRoute>
            <BookClubPage />
          </PrivateRoute>
        ),
      },
      { path: "feature", element: <Featured /> },
      { path: "privacyPolicy", element: <PrivacyPolicy /> },
      { path: "termsOfService", element: <TermsOfService /> },
      { path: "cookiePolicy", element: <CookiePolicy /> },
      { path: "allHobby", element: <AllHubby /> },
    ],
  },

  // ✅ Dashboard route fixed and wrapped correctly
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashbordlyout />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true, // ✅ Default dashboard page
        element: (
          <PrivateRoute>
            <DashboardHome />
          </PrivateRoute>
        ),
      },
      {
        path: "home",
        element: (
          <PrivateRoute>
            <DashboardHome />
          </PrivateRoute>
        ),
      },
      {
        path: "createGroup",
        element: (
          <PrivateRoute>
            <CreateGroup />
          </PrivateRoute>
        ),
      },
      {
        path: "myGroup/:email",
        loader: ({ params }) =>
          fetch(`https://ejp-s-sadmansakib34523-gmailcoms-projects.vercel.app/menus/${params.email}`),
        element: (
          <PrivateRoute>
            <MyGroups />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
