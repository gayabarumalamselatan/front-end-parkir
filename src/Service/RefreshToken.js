import axios from "axios";
import { useEffect } from "react";
import { REFRESH_TOKEN } from "../Config/ConfigUrl";


const TokenRefresh = () => {
  const refreshtoken = sessionStorage.getItem("refreshToken")
  const isLoggedIn = sessionStorage.getItem("isLoggedIn")
  useEffect(() => {
    if(isLoggedIn){
      const refreshToken = async () => {
        try {
          const refresh = await axios.post(`${REFRESH_TOKEN}`, {
            refreshToken: refreshtoken
          })
          const { accessToken } = refresh.data;
          sessionStorage.setItem("accessToken", accessToken)
        } catch (error) {
          console.error("Failed to refresh token:", error);
        }
      }; 

      const storedTime = sessionStorage.getItem("tokenRefreshTime");
      const refreshInterval = 300000;

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

      // const intervalId = setInterval(refreshToken, 300000);
      return () => clearInterval(timeoutId);
    } 
  }, [isLoggedIn, refreshtoken]);

  return null;
};

export default TokenRefresh;