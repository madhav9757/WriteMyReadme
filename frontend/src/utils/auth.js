export const getToken = () => {
  return localStorage.getItem("auth_token");
};

export const isAuthenticated = () => {
  return !!getToken();
};

export const logout = () => {
  localStorage.removeItem("auth_token");
  window.location.href = "/login";
};
