import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AUTH_SERVICE_LOGIN } from "../Config/ConfigUrl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const LoginPage = () => {
  const [name, setUserName] = useState("");
  const [password, setUserPass] = useState("");
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    password: "",
  })

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, []);

  const handleLogin = async () => {
    setIsLoading(true);
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
        sessionStorage.setItem('roleId', response.data.role_id)
      }
      console.log(JSON.stringify(response?.data));
      navigate("/");
      setIsLoading(false);
      window.location.reload();
    } catch (err) {
      console.error(err);
      setErrorMessage(err.response.data.message)
      setIsLoading(false);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({
      name: "",
      password: "",
    })

    let valid = true;
    if(!name){
      setErrors((prev) => ({
        ...prev,
        name: "Masukkan Username."
      }));
      valid= false;
    }
    if(!password){
      setErrors((prev) => ({
        ...prev,
        password: "Masukkan Password."
      }));
      valid = false;
    }
    
    if(valid){
      await handleLogin();
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

              {
                errorMessage &&
                <div className="bg-white rounded-mainCard py-4 shadow-lg mb-4">
                  <p className="text-red-500 ps-4 font-semibold ">
                    {errorMessage}
                  </p>
                </div>
              }

              <h1 className="login-box-msg text-white mb-4 text-4xl font-thin">
                Welcome Back!
              </h1>

              <form>
                <div className=" mb-4">
                  {
                    errors.name && <p className="text-red-400 mb-1">
                      {errors.name}
                    </p>
                  }
                  <input
                    id="loginUsername"
                    type="text"
                    className="form-control rounded-pill py-2"
                    placeholder="Username"
                    onChange={(e) => setUserName(e.target.value)}
                    value={name}
                  />
                  {/* <div className="input-group-text rounded-end-pill">
                  <FontAwesomeIcon className="me-1" icon={faUser}/>
                </div> */}
                </div>
                <div className="mb-5">
                  {
                    errors.password && <p className="text-red-400 mb-1">
                      {errors.password}
                    </p>
                  }
                  <div className="flex items-center relative">
                    <input
                      id="loginPassword"
                      type={isVisible ? "text" : "password"}
                      className="form-control rounded-pill py-2"
                      placeholder="Password"
                      onChange={(e) => setUserPass(e.target.value)}
                      value={password}
                    />
                    <button 
                      className="absolute right-4 flex items-center"
                      onClick={(e) => {
                        e.preventDefault()  
                        setIsVisible(!isVisible)
                      }}
                    >
                      {
                        isVisible ? 
                        <FontAwesomeIcon icon={faEye} color="#fff"/> 
                        :
                        <FontAwesomeIcon icon={faEyeSlash} color="#fff"/>
                      } 
                      
                    </button>
                  </div>
                  
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
                      {isLoading ?
                        <div className="spinner-border text-info" style={{height: "1rem", width: "1rem"}} role="status">
                          <span className="sr-only">Loading...</span>
                        </div>
                        :
                        <p>
                          Log in
                        </p>                      
                      }
                      
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
