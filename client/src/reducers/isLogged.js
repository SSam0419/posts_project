const isLoggedReducer = (state = false, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return true;
    case "LOG_OUT":
      return false;
    default: // need this for default case
      return state;
  }
};

export default isLoggedReducer;
