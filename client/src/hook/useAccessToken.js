import { verifyAccessToken } from "../api/signUser";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUserProfile } from "../slice/userSlice";
import { useEffect } from "react";

const useAccessToken = async () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    async function fetchUser() {
      const result = await verifyAccessToken(user.userProfile.access_token);
      dispatch(setUserProfile(result));
    }
    fetchUser();
  }, []);
};

export default useAccessToken;
