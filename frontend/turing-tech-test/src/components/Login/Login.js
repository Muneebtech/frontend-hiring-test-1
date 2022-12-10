import React, { useEffect, useState } from "react";
import  { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import authActions from "../../modules/auth/actions";
import AclService from "./../../services/acl";
import "./Login.scss";
const Login = ({history}) => {
  const dispatch = useDispatch();
  const { isLoggedIn, user, error } = useSelector((state) => state.authReducer);

  const [data, setdata] = useState({
    email: "",
    password: "",
  });
  const handleChange = (val) => {
    const { name, value } = val.target;
    setdata({ ...data, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(authActions.signin.request(data));
  };
  useEffect(() => {
    if (isLoggedIn) {
      const aclService = new AclService("user");
      history.push(aclService.landingPage);
    }
  }, [isLoggedIn]);
  return (
    <div className="loginWrapper">
      <span>User Name</span>
      <input name="email" onChange={handleChange}></input>
      <span>Password</span>
      <input name="password" onChange={handleChange}></input>
      <br />
      <button onClick={handleSubmit}>Log in</button>
    </div>
  );
};

export default Login;
