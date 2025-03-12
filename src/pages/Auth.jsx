import React from "react";
import { Row, Col } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { toast } from "react-toastify";
import { signupApi, loginApi } from "../services/allApi";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { authContext } from "../context/ContextApi";

function Auth() {
  const [authStatus, setAuthStatus] = useState(false);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const nav=useNavigate()
  const {setAuth}=useContext(authContext)

  const handleSignUp = async () => {
    console.log(user);
    const { username, email, password } = user;
    if (!email || !username || !password) {
      toast.warning("Enter valid data !!");
    } else {
      const result = await signupApi(user);
      console.log(result);
      if (result.status == 200) {
        toast.success("Sign up successfull !!");
        setUser({
          email: "",
          username: "",
          password: "",
        });
        changeStatus();
      } else {
        if (result.response.data) {
          toast.error(result.response.data);
          setUser({
            email: "",
            username: "",
            password: "",
          });
        } else {
          toast.warning("Something went wrong !!");
        }
      }
    }
  };

  const handleLogin=async()=>{
    const {email,password}=user
    if (!email || !password) {
      toast.warning("Enter valid data !!");
    } else {
      const result = await loginApi(user);
      console.log(result);
      if (result.status == 200) {
        toast.success("Welcome to ProjectFair !!");
        setUser({
          email: "",
          username: "",
          password: "",
        });
        nav('/')
        sessionStorage.setItem('token',result.data.token)
        sessionStorage.setItem('user',result.data.user)
        sessionStorage.setItem('github',result.data.git)
        sessionStorage.setItem('linkdin',result.data.linkdin)
        sessionStorage.setItem('profile',result.data.profile)
        setAuth(true)

      } else {
        if (result.response.data) {
          toast.error(result.response.data);
          setUser({
            email: "",
            username: "",
            password: "",
          });
        } else {
          toast.warning("Something went wrong !!");
        }
      }
    }
  }

  const changeStatus = () => {
    setAuthStatus(!authStatus);
  };

  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="w-50 border shadow border-dark bg-light p-3">
          <Row>
            <Col>
              <img
                src="https://assets-v2.lottiefiles.com/a/59ae3046-117b-11ee-88a7-ef3838e9662f/r8HuxylbzH.gif"
                alt="auth"
                className="img-fluid"
              />
            </Col>
            <Col className="d-flex flex-column justify-content-center">
              {authStatus ? (
                <h2 className="mb-3">Sign Up</h2>
              ) : (
                <h2 className="mb-3">Sign In</h2>
              )}
              <div>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Email address"
                  className="mb-3"
                >
                  <Form.Control
                    type="email"
                    value={user.email}
                    placeholder="name@example.com"
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                  />
                </FloatingLabel>
                {authStatus && (
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Username"
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      value={user.username}
                      placeholder="username"
                      onChange={(e) =>
                        setUser({ ...user, username: e.target.value })
                      }
                    />
                  </FloatingLabel>
                )}
                <FloatingLabel controlId="floatingPassword" label="Password">
                  <Form.Control
                    type="password"
                    value={user.password}
                    placeholder="Password"
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                  />
                </FloatingLabel>
                <div className="mt-3 d-flex justify-content-between">
                  {authStatus ? (
                    <button className="btn btn-success" onClick={handleSignUp}>
                      Sign Up
                    </button>
                  ) : (
                    <button className="btn btn-info" onClick={handleLogin}>Sign In</button>
                  )}
                  {authStatus ? (
                    <button className="btn btn-link" onClick={changeStatus}>
                      Existing User
                    </button>
                  ) : (
                    <button className="btn btn-link" onClick={changeStatus}>
                      New User
                    </button>
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

export default Auth;
