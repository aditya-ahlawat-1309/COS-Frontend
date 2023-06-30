import axios from "axios";
import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import DOMAIN from "../Domian";
import Spinner from "react-bootstrap/Spinner";

export const handleErrors = async (response) => {
  if (!response.ok) {
    const { message } = await response.json();
    throw Error(message);
  }
  return response.json();
};

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
 const [loading, setLoading] = useState(false);
  const history = useHistory();

const login = async(e) => {
  e.preventDefault();
  try{ 
    setError(false)
    setLoading(true)
  const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios
        .post(`${DOMAIN}/api/login`, { username, password }, config)
        .catch((err) => {
          setError(true);
        }).finally(setLoading(false));

      localStorage.setItem("userInfo", JSON.stringify(data));
       history.push("/home");
    } catch (error) {
     setError(true)
    }
  };

  return (
    <div className="welcome">
      <h1 style={{ fontSize: "3rem", color: "white", padding: "3%" }}>Login</h1>
      {error ? (
        <span style={{ color: "red", fontSize: "1.75rem", fontWeight: "bold" }}>
          Wrong Credentials
        </span>
      ) : (
        <></>
      )}
      <br />
      <br />
      <br />

      <form onSubmit={login}>
        <label
          style={{
            padding: "1%",
            paddingLeft: "10%",
            paddingRight: "10%",
            fontSize: "1.5rem",
            opacity: "1",
            color: "white",
          }}
        >
          Username
        </label>
        <input
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
          style={{
            backgroundColor: "white",
            width: "25%",
            height: "50px",
            borderRadius: "25px",
            border: "none",
            textAlign: "center",
          }}
          required
        />
        <br />
        <br />
        <label
          style={{
            padding: "1%",
            paddingLeft: "10%",
            paddingRight: "10%",
            fontSize: "1.5rem",
            opacity: "1",
            color: "white",
          }}
        >
          Password
        </label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          style={{
            backgroundColor: "white",
            width: "25%",
            height: "50px",
            borderRadius: "25px",
            border: "none",
            textAlign: "center",
          }}
          required
        />
        <br />
        <br />
        <br />
         {loading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          <>
        <button type="submit" className="loginButton">
          Login
        </button>
        <br />
        <br />
        Not a Member?{" "}
        <a style={{ textDecoration: "none", color: "yellow" }} href="/register">
          Register
        </a>
        </>
        )}
      </form>
    </div>
  );
}
