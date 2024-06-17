// src/components/PrivateRoute.js
import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();

  useEffect(() => {
    if (!userLoggedIn) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      {/* {!userLoggedIn && <Navigate to={"/login"} replace={true} />} */}
      {children}
    </>
  );
};

export default PrivateRoute;
