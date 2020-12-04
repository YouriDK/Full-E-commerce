import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signin } from "../actions/userActions";

function SignInScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userSignin = useSelector((state) => state.userSignin);
  const { loading, userInfo, error } = userSignin;

  const dispatch = useDispatch();
  useEffect(() => {
    if (userInfo) {
      props.history.push("/");
    }
    return () => {
      /* *  return nothing*/
    };
  }, [userInfo]);
  // ! If you don't put , [] at the end , he will start again over and over
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };
  return (
    <div className="form">
      <form onSubmit={submitHandler}>
        <ul className="form-container">
          <li>
            <h2 className="text-center">Sign-In</h2>
          </li>
          <li>
            {loading && <div> Loading .. </div>}
            {error && <div> Error .. </div>}
          </li>
          <li>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </li>
          <li>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></input>
          </li>
          <li>
            <button type="submit" className=" button primary">
              Sign-In{" "}
            </button>
          </li>
          <li>New to Amazona ?</li>
          <li>
            <Link to="/register" className="button secondary text-center">
              {" "}
              Create your amazona account{" "}
            </Link>
          </li>
        </ul>
      </form>
    </div>
  );
}
export default SignInScreen;
