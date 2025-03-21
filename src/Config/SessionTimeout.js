import axios from "axios"
import { AUTH_SERVICE_LOGOUT } from "./ConfigUrl"
import { useEffect } from "react"

const logout = async () => {

  const userId = parseInt(sessionStorage.getItem('userId'))

  try {
    const response = await axios.post(`${AUTH_SERVICE_LOGOUT}`, {
      userId
    })
    console.log(response)
    sessionStorage.clear();
    localStorage.clear();
    window.location.href = '/login'
  } catch (error) {
    console.error(error)
  }
}

const SessionTimeout = () => {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn")
  useEffect(() => {
    if(isLoggedIn){

      const sessionDuration = 3600000;
      const storedStartTime = sessionStorage.getItem("sessionStartTime");
      let timeoutId;

      const resetTimeout = () => {
        clearTimeout(timeoutId);
        sessionStorage.setItem("sessionStartTime", Date.now().toString());
        timeoutId = setTimeout(() => {
          logout();
        }, sessionDuration);
      };
      
      if(storedStartTime){
        const elapsedTime = Date.now() - parseInt(storedStartTime, 10);
        const remainingtime = sessionDuration - elapsedTime;
        
        if(remainingtime > 0) {
          timeoutId = setTimeout(() => {
            logout();
          }, remainingtime);
        } else {
          logout();
        }
      } else {
        sessionStorage.setItem("sessionStartTime", Date.now().toString());
        timeoutId = setTimeout(() => {
          logout();
        }, sessionDuration);
      }

      window.addEventListener('mousemove', resetTimeout);
      window.addEventListener('keypress', resetTimeout);
  
      return () => {
        clearTimeout(timeoutId);
        window.removeEventListener('mousemove', resetTimeout);
        window.removeEventListener('keypress', resetTimeout);
      };
    }
  },[isLoggedIn]);
  return null;
}

export default SessionTimeout