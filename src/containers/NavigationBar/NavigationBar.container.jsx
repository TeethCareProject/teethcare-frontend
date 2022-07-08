import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, matchPath } from "react-router-dom";
import { logoutHandler } from "../../redux/authentication/authentication.action";
import RoutePath from "../../routers/Path";

import NavigationBarComponent from "../../components/commons/NavigationBar/NavigationBar.component";

const NavigationBarContainer = ({ location }) => {
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
    const nav = document.querySelectorAll(".nav-element");
    for (let i = 0; i < nav.length; i++) {
      if (nav[i].innerHTML == e.target.innerHTML) {
        nav[i].classList.add("active");
      } else {
        nav[i].classList.remove("active");
      }
    }
    if (e.target.innerHTML === "Logout") {
      //call logout
      dispatch(logoutHandler());
      history.push(RoutePath.HOME_PAGE);
    } else if (e.target.innerHTML === "Login") {
      history.push(RoutePath.LOGIN_PAGE);
    } else if (e.target.innerHTML === "Home") {
      history.push(RoutePath.HOME_PAGE);
    } else if (e.target.innerHTML === "Dashboard") {
      history.push(RoutePath.DASHBOARD_PAGE);
    }
  };

  return (
    <>
      {match ? null : (
        <NavigationBarComponent
          location={location}
          isAuthUser={isAuthUser}
          onClick={onClick}
          userName={userName}
          history={history}
        />
      )}
    </>
  );
};

export default NavigationBarContainer;
