import axios from "axios";
import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { handleErrors } from "./Login";
import DOMAIN from "../Domian";
import Spinner from "react-bootstrap/Spinner";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const [showA, setShowA] = useState(false);

  const toggleShowA = () => setShowA(!showA);

const register = async (e) => {
  e.preventDefault();
try {
  setLoading(true)
  setError(false)
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios
        .post(
          `${DOMAIN}/api/register`,
          {
            username,
            password,
          },
          config
        )
        .catch((err) => {
          console.log(err);
        }).finally(setLoading(false));
      console.log(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
     history.push("/login");
    } catch (error) {
      console.log(error);
      setError(error.message)
    }
  };

  return (
    <div className="welcome">
      <h1 style={{ fontSize: "3rem", color: "white", padding: "3%" }}>
        Register
      </h1>

      {error ? (
        <span style={{ color: "red", fontSize: "1.5rem", fontWeight: "bold" }}>
          User Already Exists
        </span>
      ) : (
        <></>
      )}
      <br />
      <br />
      <br />
      <form onSubmit={register}>
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
        {loading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          <>
            <button type="submit" className="loginButton">
              Register
            </button>
            <br />
            <br />
            Already a Member?{" "}
            <a
              style={{ textDecoration: "none", color: "yellow" }}
              href="/login"
            >
              Login
            </a>
          </>
        )}
      </form>
    </div>
  );
}
