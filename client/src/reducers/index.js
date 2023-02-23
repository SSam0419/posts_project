import { combineReducers } from "redux";
import isLoggedReducer from "./isLogged";
import createUserReducer from "./createUser";
import authReducer from "./auth";

const allReducers = combineReducers({
  isLogged: isLoggedReducer,
  createUser: createUserReducer,
  accessToken: authReducer,
});

export default allReducers;
