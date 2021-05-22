import React, { useEffect, isValidElement, cloneElement } from "react";
import Router from "next/router";
import { useAuth } from "../../context/auth";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  // * Redirect to home if not logged in2
  useEffect(() => {
    if (!isAuthenticated()) {
      Router.push("/");
    }
  }, [isAuthenticated]);

  return React.Children.map(children, (child) => {
    if (isValidElement(child)) {
      return cloneElement(child);
    }

    return child;
  });
};

export default React.memo(PrivateRoute);
