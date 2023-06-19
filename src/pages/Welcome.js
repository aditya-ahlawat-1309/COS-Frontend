import React, { useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { ChatContext } from "../Context/ChatProvider";
import "./pages.css"

export default function Welcome() {
  const { user } = useContext(ChatContext);
  const history = useHistory();

  useEffect(() => {
    if (user && user.token) {
      history.push("/home");
    }
  });

  return (
    <div className="welcome">
      <br />
      <br />
      <h1
        style={{
          fontSize: "3rem",
          padding: "5%",
          width: "50%",
          marginLeft: "20%",
          height: "100px",
        }}
      >
        Welcome
      </h1>
      <div>
        <Link
          to="/login"
          className="welcome-link"
          // style={{
          //   textDecoration: "none",
          //   color: "white",
          //   fontSize: "2rem",
          //   fontWeight: "500",
          //   backgroundColor: "red",
          //   opacity: "1",
          //   padding: "2%",
          //   paddingLeft: "5%",
          //   paddingRight: "5%",
          // }}
        >
          Login
        </Link>
        <br />
        <br />
        <Link
          to="/register"
          className="welcome-link"
          // style={{
          //   textDecoration: "none",
          //   color: "white",
          //   fontSize: "2rem",
          //   fontWeight: "500",
          //   backgroundColor: "green",
          //   opacity: "1",
          //   padding: "2%",
          //   paddingLeft: "5%",
          //   paddingRight: "5%",
          // }}
        >
          Register
        </Link>
      </div>
    </div>
  );
}

