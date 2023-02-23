export const FORM_DATA = (form_data) => {
  return { type: "FILL_FORM", payload: form_data };
};

export const AUTH_TOKEN = (token) => {
  return { type: "AUTH_TOKEN", payload: token };
};
