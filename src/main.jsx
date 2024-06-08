import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './pages/Shorts.jsx'
import GlobalErrors from './Errors/GlobalErrors.jsx'; 
import Shorts from './pages/Shorts.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Medium from './GlobalConfigs/Medium.jsx';
import Section from './GlobalConfigs/Section.jsx';
import Grade from './GlobalConfigs/Grade.jsx';
import Category from './GlobalConfigs/Category.jsx';
import Cast from './GlobalConfigs/Cast.jsx';
import Bank from './GlobalConfigs/Bank.jsx';
import Feehead from './GlobalConfigs/Feehead.jsx';
import Discounthead from './GlobalConfigs/Discounthead.jsx';
import Finehead from './GlobalConfigs/Finehead.jsx';
import Academicyear from './GlobalConfigs/Academicyear.jsx';
import MonthMapping from './GlobalConfigs/MonthMapping.jsx';
import FeeClassMap from './GlobalConfigs/FeeClassMap.jsx';
import FeeMonthMap from './GlobalConfigs/FeeMonthMap.jsx';

const routerProvider = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Login />,
      },      
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    errorElement: <GlobalErrors />,
    children: [
      {
        path: "medium",
        element: <Medium />,
      },
      {
        path: "section",
        element: <Section />,
      },
      {
        path: "grade",
        element: <Grade />,
      },
      {
        path: "category",
        element: <Category />,
      },
      {
        path: "cast",
        element: <Cast />,
      },
      {
        path: "bank",
        element: <Bank />,
      },
      {
        path: "fee-head",
        element: <Feehead />,
      },
      {
        path: "discount-head",
        element: <Discounthead />,
      },
      {
        path: "fine",
        element: <Finehead />,
      },
      {
        path: "academic-year",
        element: <Academicyear />,
      },
      {
        path: "month-map",
        element: <MonthMapping />,
      },
      {
        path: "fee-class",
        element: <FeeClassMap />,
      },
      {
        path: "fee-month",
        element: <FeeMonthMap />,
      },
      {
        path: "shorts",
        element: <Shorts />,
      },      
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={routerProvider} />
  </React.StrictMode>,
)
