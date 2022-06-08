import { notification } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { loginStorageHandler } from "../../redux/authentication/authentication.action";
import { loginAPI } from "../../services/teeth-apis/AuthController";
import LoginFormComponent from "../../components/LoginForm/LoginForm.component";
import { useHistory } from "react-router-dom";
import RoutePath from "../../routers/Path";

const LoginFormContainer = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onFinish = async (values) => {
    //call api
    try {
      const { data } = await loginAPI(values.username, values.password);
      dispatch(loginStorageHandler(data));

      //go to page
      history.push(RoutePath.DASHBOARD_PAGE);
    } catch (e) {
      notification["error"]({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while login, try again later`,
        duration: 2,
      });
    }
  };

  return <LoginFormComponent onFinish={onFinish} />;
};

export default LoginFormContainer;
