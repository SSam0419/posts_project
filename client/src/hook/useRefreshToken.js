import { verifyAccessToken, verifyRefreshToken } from "../api/signUser";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

export default useAccessToken = () => {
  const access_token = useSelector((state) => state.accessToken);
  const result = verifyAccessToken(access_token);
  if (result === "token expired") {
    // retrieve refresh token from cookie
    const current_refresh_token = Cookies.get("jwt");
    const verify = verifyRefreshToken(current_refresh_token);
  }
};
