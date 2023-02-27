import { verifyAccessToken, verifyRefreshToken } from "../api/signUser";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { selectUser } from "../slice/userSlice";

export default useAccessToken = () => {
  const user = useSelector(selectUser);
  const access_token = user.access_token;
  const result = verifyAccessToken(access_token);
  if (result === "token expired") {
    // retrieve refresh token from cookie
    const current_refresh_token = Cookies.get("jwt");
    const verify = verifyRefreshToken(current_refresh_token);
  } else {
    // request new pair
  }
};
