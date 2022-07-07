import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, matchPath } from "react-router-dom";
import { logoutHandler } from "../../redux/authentication/authentication.action";
import RoutePath from "../../routers/Path";

import NavigationBarComponent from "../../components/commons/NavigationBar/NavigationBar.component";

const NavigationBarContainer = ({ location }) => {
  const [current, setCurrent] = useState("mail");
  const dispatch = useDispatch();
  const history = useHistory();
  const isAuthUser = useSelector((state) => state.authentication.isAuthUser);
  const userName = useSelector(
    (state) =>
      state?.authentication?.user?.firstName +
      state?.authentication?.user?.lastName
  );

  const match = matchPath(location, {
    path: [RoutePath.REGISTER_PARE, RoutePath.LOGIN_PAGE],
    exact: true,
    strict: true,
  });

  const onClick = (e) => {
    console.log(e);
    if (e.key === "logout") {
      //call logout
      dispatch(logoutHandler());
      history.push(RoutePath.HOME_PAGE);
    } else if (e.key === "login") {
      history.push(RoutePath.LOGIN_PAGE);
      console.log(history);
      setCurrent(e.key);
    } else if (e.key === "home") {
      history.push(RoutePath.HOME_PAGE);
      setCurrent(e.key);
    } else if (e.key === "dashboard") {
      history.push(RoutePath.DASHBOARD_PAGE);
      setCurrent(e.key);
    }
  };

  return (
    <>
      {match ? null : (
        <NavigationBarComponent
          isAuthUser={isAuthUser}
          onClick={onClick}
          userName={userName}
          current={current}
          history={history}
        />
      )}
    </>
  );
};

export default NavigationBarContainer;
