//This routing rule allows the current user to have this role "ATTENDANT"
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import ErrorPage from "../../pages/ErrorPage/ErrorPage";
import React from "react";

const PrivateRouter = ({ component: Component, accessibleRoles, ...rest }) => {
  const { user, isAuthUser } = useSelector((state) => state.authentication);
  const resultComponent = (props) => {
    if (isAuthUser && accessibleRoles.includes(user.role)) {
      //check if current role are "ATTENDANT" allow to access current component
      return <Component {...props} />;
    }

    if (isAuthUser && !accessibleRoles.includes(user.role)) {
      //check if current role not in "ATTENDANT" deny to access current component and show 403 Error Page
      return <ErrorPage code={403} />;
    }

    if (!isAuthUser) {
      //check if current user not login send back to login Page
      return <ErrorPage code={403} />;
    }
  };
  return <Route {...rest} render={(props) => resultComponent(props)} />;
};
export default PrivateRouter;
