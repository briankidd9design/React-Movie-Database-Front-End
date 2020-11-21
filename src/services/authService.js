import jwtDecode from "jwt-decode";
import http from "./httpService";
// import { apiUrl } from "../config.json";

const apiEndpoint = "/auth";
const tokenKey = "token";

http.setJwt(getJwt() );

export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndpoint, { email, password });
  localStorage.setItem("token", jwt);
}
//login upon registering
export function loginWithJwt(jwt) {
    localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
    try {
        const jwt = localStorage.getItem(tokenKey);
        return jwtDecode(jwt);
        //updating the state is the responsibility of a component
        // this.setState({ user })
        }catch(ex){
            return null;
        }
}

export function getJwt() {
    return localStorage.getItem(tokenKey);
}

export default {
    login,
    logout,
    getCurrentUser,
    loginWithJwt,
    getJwt
}