import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function RegisterScreen(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, userInfo, error } = userRegister;

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/"; // * Redirgier après un checkout

  const dispatch = useDispatch();
  // ! If you don't put , [] at the end , he will start again over and over
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Put the same password and confirmation please !");
    } else {
      dispatch(register(name, email, password));
    }
  };

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
    return () => {
      /* *  return nothing*/
    };
  }, [userInfo]);

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          {" "}
          <h2>Create an account</h2>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}

        <div>
          <label htmlFor="name">Name</label>
          <input
            placeholder="Enter name"
            type="name"
            name="name"
            id="name"
            required
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            placeholder="Enter email"
            type="email"
            name="email"
            id="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            name="password"
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
        </div>
        <div>
          <label htmlFor="rePassword">Re-Enter Password</label>
          <input
            type="password"
            id="confirmPassword"
            confirmPassword
            required
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          ></input>
        </div>
        <div>
          <button type="submit" className="primary">
            Register{" "}
          </button>
        </div>
        <div>
          Already signed ? <br />
          <br />
          <Link
            to={redirect === "/" ? "signin" : "signin?redirect=" + redirect}
            className="button secondary text-center"
          >
            SIgn-In
          </Link>
        </div>
      </form>
    </div>
  );
}
