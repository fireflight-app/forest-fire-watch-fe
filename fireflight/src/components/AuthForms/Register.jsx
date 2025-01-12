import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { GlobalContext } from "../../context/contextProvider";

import useInput from "../../utils/useInput";
import styled from "styled-components";
import logo from "../../images/FF-logo.png";
import RegisterSplit from "./RegisterSplit";

function Register({ toggle, setShowAuthForms }) {
  //useInput is a custom hook that should be used for all controlled inputs
  const [username, setUsername, handleUsername] = useInput("", "username");
  const [password, setPassword, handlePassword] = useInput("", "password");
  //second password input used to ensure no typos in passwords
  const [passwordConf, setPasswordConf, handlePasswordConf] = useInput(
    "",
    "passwordConf"
  );
  const [loading, setLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);
  const [errorText, setErrorText] = useState({});

  const data = useContext(GlobalContext);

  console.log(errorText);

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    // ERROR HANDLING EXPLANATION
    // We first check if password and passwordConf match. We do this on the front end because the passwordConf does not get passed to the backend to check it.
    // The user credentials are then validated on the backend, if they are invalid, the server returns a 400 status code that triggers the catch method in the api call.
    // The errorStatus hook is set to true so that we can check if errors exist.
    // The errorText is set to the error descriptions that are coming from the server.
    // We then display those error descriptions below in some p tags.

    if (password === passwordConf) {
      const newUser = { username, password };
      data.state.remote
        .register(newUser)
        .then(res => {
          setUsername("");
          setPassword("");
          setPasswordConf("");
          setLoading(false);
          setShowAuthForms(false);
        })
        .catch(err => {
          console.log(err);
          setErrorStatus(true);
          setErrorText(err.response.data);
          setLoading(false);
        });
    } else {
      setErrorStatus(true);
      setErrorText({ password: "Passwords must match" });
      setLoading(false);
    }
  }

  if (data.token != null) {
    console.log(localStorage.getItem("token"));
    return <Redirect to="/" />;
  } else {
    return (
      <RegPageContainer>
        <RegisterSplitContainer>
          <RegisterSplit toggle={toggle} />
        </RegisterSplitContainer>
        <RegisterContainer>
          <img src={logo} alt="FireFlight" />
          <h2 className="form-heading">Create Account</h2>
          <div
            className="fb-login-button"
            data-width="150px"
            data-size="medium"
            data-button-type="login_with"
            data-auto-logout-link="true"
            data-use-continue-as="false"
          />
          <form className="auth-form-container" onSubmit={handleSubmit}>
          <label htmlFor="username">
            <i className="fas fa-user-circle fa-lg" />
          </label>
            <input
              className="form-input"
              type="text"
              name="username"
              value={username}
              onChange={handleUsername}
              placeholder="Username"
            />
            {errorStatus ? (
              <ErrorText>{errorText.username}</ErrorText>
            ) : (
              <ErrorText />
            )}
            <label htmlFor="password">
            <i className="fas fa-lock fa-lg" />
            </label>
            <input
              className="form-input"
              type="password"
              name="password"
              value={password}
              // onChange={e=>setPassword(e.value)}
              onChange={handlePassword}
              placeholder="Password"
            />
            {errorStatus ? (
              <ErrorText>{errorText.password}</ErrorText>
            ) : (
              <ErrorText />
            )}
            <label htmlFor="password">
            <i className="fas fa-key fa-lg" />
            </label>
            <input
              className="form-input"
              type="password"
              name="passwordConf"
              value={passwordConf}
              // onChange={e=>setPasswordConf(e.value)}
              onChange={handlePasswordConf}
              placeholder="Confirm Password"
            />

            <button className="auth-btn" type="submit" disabled={loading}>
              {loading ? "Loading..." : "Create Account"}
            </button>
          </form>
        </RegisterContainer>
      </RegPageContainer>
    );
  }
}

export default Register;

const RegPageContainer = styled.div`
  width: 100%;
  margin: auto;
  text-align: center;
  display: flex;
  min-height: 500px;
  background-image: linear-gradient(
    #f8b195,
    #f67280,
    #c06c84,
    #6c5b7b,
    #355c7d
  );
  border-radius: 8px;
  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const RegisterContainer = styled.div`
  width: 60%;
  height: auto;
  margin: auto;
  @media (max-width: 900px) {
    width: 90%;
    order: 1;
  }
`;

const RegisterSplitContainer = styled.div`
  width: 50%;
  @media (max-width: 900px) {
    width: 100%;
    order: 2;
  }
`;

const ErrorText = styled.p`
  color: darkred;
  font-size: 0.75em;
  margin: 0px;
  padding: 2px;
  height: 15px;
`;
