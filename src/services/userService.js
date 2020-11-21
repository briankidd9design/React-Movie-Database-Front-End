import http from "./httpService";
// import { apiUrl } from "../config.json";

const apiEndpoint = "/users";
//send http request to the server and return the promise
export function register(user) {
  return http.post(apiEndpoint, {
    email: user.username,
    password: user.password,
    name: user.name,
  });
}
