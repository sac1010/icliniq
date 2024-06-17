import Login from "../components/Login";
import Register from "../components/Signup";
import Dashboard from "../components/Dashboard";
import PrivateRoute from "./PrivateRoutes";
import { Navigate, Route, Routes } from "react-router-dom";
import CreateTask from "../components/CreateTask";
import TaskList from "../components/TaskList";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      >
        <Route index element={<Navigate to="create" />} />
        <Route path="create" element={<CreateTask />}></Route>
        <Route path="tasks" element={<TaskList />}></Route>
      </Route>
    </Routes>
  );
};

export default AllRoutes;
