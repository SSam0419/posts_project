const authReducer = (state = "", action) => {
  switch (action.type) {
    case "AUTH_TOKEN":
      state = action.payload;
      return state;
    default: // need this for default case
      return state;
  }
};

export default authReducer;
