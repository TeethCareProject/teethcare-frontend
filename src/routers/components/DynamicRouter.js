//This routing rule allows the current user to have this role "ATTENDANT"
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import ErrorPage from "../../pages/ErrorPage/ErrorPage";
import React from "react";

const DynamicRouter = ({ componentList, accessibleRoles, ...rest }) => {
  const { user, isAuthUser } = useSelector((state) => state.authentication);
  const resultComponent = (props) => {
    if (isAuthUser && accessibleRoles.includes(user.roleName)) {
      const Component = componentList[user.roleName];
      return Component();
    }

    if (isAuthUser && !accessibleRoles.includes(user.roleName)) {
      return <ErrorPage code={403} />;
    }

    if (!isAuthUser) {
      return <ErrorPage code={403} />;
    }
  };
  return <Route {...rest} render={(props) => resultComponent(props)} />;
};
export default DynamicRouter;
