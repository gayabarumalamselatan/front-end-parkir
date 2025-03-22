import axios from "axios";
import { useEffect } from "react";
import { GENERATE_REFRESH_TOKEN } from "../Config/ConfigUrl";

const GenerateRefreshToken = () => {
  const refreshtoken = sessionStorage.getItem("refreshToken")
  const isLoggedIn = sessionStorage.getItem("isLoggedIn")

  useEffect(() => {
    if(isLoggedIn && refreshtoken){
      const refreshToken = async () => {
        try {
          const refresh = await axios.post(`${GENERATE_REFRESH_TOKEN}`, {
            refreshToken: refreshtoken
          })
          const { refreshToken } = refresh.data;
          sessionStorage.setItem("refreshToken", refreshToken)
          sessionStorage.setItem("generateTokenRefresh", Date.now().toString());
          console.log("Token generated successfully!");
        } catch (error) {
          console.error("Failed to refresh token:", error);
        }
      }; 

      const storedTime = sessionStorage.getItem("generateTokenRefresh");
      const refreshInterval = 3600000 - 1000;

      if (!storedTime || Date.now() - parseInt(storedTime, 10) > refreshInterval) {
        refreshToken(); 
      }
     
      const intervalId = setInterval(refreshToken, refreshInterval);

      return () => clearInterval(intervalId);
    } 
  }, [isLoggedIn, refreshtoken]);

  return null;
};

export default GenerateRefreshToken;