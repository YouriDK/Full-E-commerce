import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signin } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function SignInScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // * Permet d'aller chercher les informations dans store avec le bon reducer
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  // * Rediriger après un checkout
  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const dispatch = useDispatch();

  // ! If you don't put , [] at the end , he will start again over and over
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Sign-In</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter email"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter password"
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
        </div>
        <div>
          <button type="submit" className="primary">
            Sign-In{" "}
          </button>
        </div>

        <div>
          You don't have you account ?
          <br />
          <Link
            to={redirect === "/" ? "register" : "register?redirect=" + redirect}
          >
            Create your account
          </Link>
        </div>
      </form>
    </div>
  );
}
