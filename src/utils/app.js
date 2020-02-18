import Cookie from "cookie_js";

const adminToken = "admin_token";
const usernameKey = "username";

export function getToken() {
  return Cookie.get(adminToken);
}
export function setToken(token) {
  return Cookie.set(adminToken, token);
}
export function removeToken(token) {
  return Cookie.remove(token);
}
export function setUsername(value) {
  return Cookie.set(usernameKey, value);
}
export function getUsername() {
  return Cookie.get(usernameKey);
}
export function removeUsername() {
  return Cookie.remove(usernameKey);
}
