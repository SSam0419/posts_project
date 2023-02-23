const initState = {
  username: "",
  password: "",
};

const createUserReducer = (state = initState, action) => {
  switch (action.type) {
    case "FILL_FORM":
      const change = action.payload;
      state = { ...state, ...change };
      return state;
    default: // need this for default case
      return state;
  }
};

export default createUserReducer;
