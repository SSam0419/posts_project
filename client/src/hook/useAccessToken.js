import { verifyAccessToken } from "../api/signUser";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUserProfile } from "../slice/userSlice";

const useAccessToken = async () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const access_token = user.userProfile.access_token;
  const result = await verifyAccessToken(access_token);
  dispatch(setUserProfile(result));
};

export default useAccessToken;
