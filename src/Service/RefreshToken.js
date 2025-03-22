import axios from "axios";
import { useEffect } from "react";
import { REFRESH_TOKEN } from "../Config/ConfigUrl";

const TokenRefresh = () => {
  const refreshtoken = sessionStorage.getItem("refreshToken");
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");

  useEffect(() => {
    if (isLoggedIn && refreshtoken) {
      const refreshToken = async () => {
        try {
          const refresh = await axios.post(`${REFRESH_TOKEN}`, {
            refreshToken: refreshtoken,
          });
          const { accessToken } = refresh.data;
          sessionStorage.setItem("accessToken", accessToken);
          sessionStorage.setItem("tokenRefreshTime", Date.now().toString());
          console.log("Token refreshed successfully!");
        } catch (error) {
          console.error("Failed to refresh token:", error);
        }
      };

      const lastRefreshTime = sessionStorage.getItem("tokenRefreshTime");
      const refreshInterval = 300000 - 1000; // 5 minutes

      if (!lastRefreshTime || Date.now() - parseInt(lastRefreshTime, 10) > refreshInterval) {
        refreshToken(); 
      }

      const intervalId = setInterval(refreshToken, refreshInterval);

      return () => clearInterval(intervalId);
    }
  }, [isLoggedIn, refreshtoken]);

  return null;
};

export default TokenRefresh;