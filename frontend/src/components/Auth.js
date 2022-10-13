import axios from "axios";
import {API_URL} from "./Api";

let token = null;

export function setToken(t) {
    window.localStorage.setItem("token", t);
    token = t;
}

export function loadToken() {
    token = window.localStorage.getItem("token");
    return token;
}

export function getToken() {
    return token;
}

export async function login(email, password) {
    return axios.post(
        `${API_URL}auth/login`,
        {email, password}
    );
}

export function logout() {
    window.localStorage.removeItem("token");
}
