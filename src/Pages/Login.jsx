import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [userName, setUserName] = useState("");
  const [userPass, setUserPass] = useState("");
  const navigate = useNavigate();
  // const [errMsg ,setErrMsg] = useState()
  const login_url = "https://5z0e4.wiremockapi.cloud/auth-service/login";

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const requestData = {userName, password};
      const response = await axios.post(
        login_url,
        JSON.stringify({ userName, userPass }),
        // JSON.stringify({email, password}),
        // requestData,
        {
          Headers: { "Content-Type": "application/json" },
          // withCredentials: true
        }
      );
      if (response.status === 200) {
        sessionStorage.setItem("isLoggedIn", "true");
      }
      console.log(JSON.stringify(response?.data));

      // const accessToken = response?.data?.accessToken;
      // const roles = response?.data?.roles;
      // // setAuth({userName, userPass, roles, accessToken});
      // setAuth({
      //   email,
      //   password
      // })
      // setUserName('');
      // setUserPass('');
      // setSuccess(true);
      // sessionStorage.setItem('token', response.data.token);
      navigate("/");
    } catch (err) {
      // if(!err.response){
      //   setErrMsg('No Server Response');
      // }else if(err.response?.status===400){
      //   setErrMsg('Missing Username or Password');
      // }else if (err.response?.status === 401){
      //   setErrMsg('Unauthorized');
      // }else{
      //   setErrMsg('Login Failed');
      //   setLoginError(true)
      // }
      console.err(err);
    }
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
              <h1 className="login-box-msg text-white mb-4 fw-light">
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
                    value={userName}
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
                    value={userPass}
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
