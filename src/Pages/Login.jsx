import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AUTH_SERVICE_LOGIN } from "../Config/ConfigUrl";

const LoginPage = () => {
  const [name, setUserName] = useState("");
  const [password, setUserPass] = useState("");
  const navigate = useNavigate();
  

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, []);

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${AUTH_SERVICE_LOGIN}`,
        {
          name, password
        },
      );
      console.log("response",response)
      if (response.status === 200) {
        sessionStorage.setItem("isLoggedIn", "true");
        console.log(response.data.userId)
        sessionStorage.setItem('userId', response.data.userId)
        sessionStorage.setItem('userName', response.data.userName)
        sessionStorage.setItem('accessToken', response.data.accessToken)
        sessionStorage.setItem('refreshToken', response.data.refreshToken)
      }
      console.log(JSON.stringify(response?.data));
      navigate("/");
      window.location.reload()
    } catch (err) {
      console.error(err);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleLogin()
  };

  return (
    <div>
      <div
        className="d-flex justify-content-center align-items-center bg-body-secondary background-image"
        style={{ minHeight: "100vh" }}
      >
        <div className="login-box">
          <div className="card-primary">
            <div className="card-body login-card-body bg-transparent">
              <h1 className="login-box-msg text-white mb-4 text-4xl font-thin">
                Welcome Back!
              </h1>
              <form>
                <div className="input-group mb-4">
                  <input
                    id="loginEmail"
                    type="email"
                    className="form-control rounded-pill py-2"
                    placeholder="Username"
                    onChange={(e) => setUserName(e.target.value)}
                    value={name}
                  />
                  {/* <div className="input-group-text rounded-end-pill">
                  <FontAwesomeIcon className="me-1" icon={faUser}/>
                </div> */}
                </div>
                <div className="input-group mb-5">
                  <input
                    id="loginPassword"
                    type="password"
                    className="form-control rounded-pill py-2"
                    placeholder="Password"
                    onChange={(e) => setUserPass(e.target.value)}
                    value={password}
                  />
                  {/* <div className="input-group-text rounded-end-pill">
                  <FontAwesomeIcon className="me-1" icon={faEye}/>
                </div> */}
                </div>
                {/*begin::Row*/}
                <div className="row">
                  {/* /.col */}
                  <div className="d-grid gap-2">
                    <button
                      id="loginButton"
                      type="submit"
                      onClick={handleSubmit}
                      className="py-2 rounded-pill"
                    >
                      Sign In
                    </button>
                  </div>
                  {/* /.col */}
                </div>
                {/*end::Row*/}
              </form>
            </div>
            {/* /.login-card-body */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
