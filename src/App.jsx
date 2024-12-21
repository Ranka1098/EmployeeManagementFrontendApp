import React from "react";
import EmployeeDetail from "./component/EmployeeDetail";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddEmployee from "./component/AddEmployee";
import UpdateEmployee from "./component/UpdateEmployee";
import SingleEmpolyeeDetail from "./component/SingleEmpolyeeDetail";

const App = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <EmployeeDetail />,
    },
    {
      path: "/add",
      element: <AddEmployee />,
    },
    {
      path: "/update/:id",
      element: <UpdateEmployee />,
    },
    {
      path: "/singleEmp/:id",
      element: <SingleEmpolyeeDetail />,
    },
  ]);
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default App;
