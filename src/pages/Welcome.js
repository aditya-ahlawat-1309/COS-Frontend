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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          marginLeft: "40%",
        }}
      >
        <Link to="/login" className="welcome-link">
          Login
        </Link>
        <Link to="/register" className="welcome-link" style={{marginLeft:"15%"}}>
          Register
        </Link>
      </div>
    </div>
  );
}

