import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../actions/userActions";

export default function RegisterScreen(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, userInfo, error } = userRegister;
  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/"; // * Redirgier après un checkout

  const dispatch = useDispatch();
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
    return () => {
      /* *  return nothing*/
    };
  }, [userInfo]);
  // ! If you don't put , [] at the end , he will start again over and over
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password));
  };
  return (
    <div className="form">
      <form onSubmit={submitHandler}>
        <ul className="form-container">
          <li>
            <h2 className="text-center">Create an account</h2>
          </li>
          <li>
            {loading && <div> Loading .. </div>}
            {error && <div> Error .. </div>}
          </li>
          <li>
            <label htmlFor="name">Name</label>
            <input
              type="name"
              name="name"
              id="name"
              onChange={(e) => setName(e.target.value)}
            ></input>
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
            <label htmlFor="rePassword">Re-Enter Password</label>
            <input
              type="password"
              id="rePassword"
              name="rePassword"
              onChange={(e) => {
                setRePassword(e.target.value);
              }}
            ></input>
          </li>
          <li>
            <button type="submit" className=" button primary">
              Register{" "}
            </button>
          </li>
          <li>Already have an account ?</li>
          <li>
            <Link
              to={redirect === "/" ? "signin" : "signin?redirect=" + redirect}
              className="button secondary text-center"
            >
              {" "}
              Create your amazona account{" "}
            </Link>
          </li>
        </ul>
      </form>
    </div>
  );
}
