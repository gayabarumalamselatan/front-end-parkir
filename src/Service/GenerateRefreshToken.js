import axios from "axios";
import { useEffect } from "react";
import { GENERATE_REFRESH_TOKEN } from "../Config/ConfigUrl";

const GenerateRefreshToken = () => {
  const refreshtoken = sessionStorage.getItem("refreshToken")
  const isLoggedIn = sessionStorage.getItem("isLoggedIn")
  useEffect(() => {
    if(isLoggedIn){
      const refreshToken = async () => {
        try {
          const refresh = await axios.post(`${GENERATE_REFRESH_TOKEN}`, {
            refreshToken: refreshtoken
          })
          const { refreshToken } = refresh.data;
          sessionStorage.setItem("refreshToken", refreshToken)
        } catch (error) {
          console.error("Failed to refresh token:", error);
        }
      }; 

      const storedTime = sessionStorage.getItem("tokenRefreshTime");
      const refreshInterval = 3600000;

      if(storedTime){
        const elapsedTime = Date.now() - parseInt(storedTime, 10);
        const remainingTime = refreshInterval - elapsedTime;

        if(remainingTime > 0){
          const timeoutId = setTimeout(() => {
            refreshToken();
            sessionStorage.setItem("tokenRefreshTime", Date.now().toString());
          }, remainingTime);
          return () => clearTimeout(timeoutId);
        }
      }

      const timeoutId = setTimeout(() => {
        refreshToken();
        sessionStorage.setItem("tokenRefreshTime", Date.now().toString());
      }, refreshInterval)

      return () => clearInterval(timeoutId);
    } 
  }, [isLoggedIn, refreshtoken]);

  return null;
};

export default GenerateRefreshToken;