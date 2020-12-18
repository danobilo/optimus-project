import axios from "axios";
import decode from "jwt-decode";
// import { EventBus } from './event-bus.js';
import getBaseUrl from "./baseUrl";

const baseUrl = getBaseUrl();

export default {

    signup: function (context, user) {
        axios.post(baseUrl + "auth/signup", user)
            .then(response => {
                console.log(response.data);
                if (response.data.user) {
                    console.log("A new user has been created");
                    context.status = "success";
                    context.message = response.data.message;
                    context.errors = null;
                    context.$router.push("/login");
                } else {
                    context.status = "error";
                    context.errors = response.data.errors;
                }
            })
            .catch(e => {
                context.errors.push(e);
            });
    },
    signin: function (context, user) {
        axios.post(baseUrl + "auth/login", user)
            .then(response => {
                if (response.data.token) {
                    localStorage.setItem("token", response.data.token);
                    context.$router.push("/account");
                    // EventBus.$emit('login', 'logged in')
                } else {
                    context.status = "error";
                    context.errors = response.data;
                }
            })
            .catch(e => {
                context.status = "error";
                context.errors.push(e);
            });
    }
};

export function signin(context, user) {
    axios.post(baseUrl + "auth/login", user)
        .then(response => {
            // console.log(response.data);
            if (response.data.access_token) {
                // console.log('success');
                localStorage.setItem("token", response.data.access_token);
                window.location.reload();
                // context.$router.push("/account");
                // EventBus.$emit('login', 'logged in')
            } else {
                // context.status = "error";
                // context.errors = response.data;
            }
        })
        .catch(e => {
            context.status = "error";
            context.errors.push(e);
        });
}

export function auth(to, from, next) {
    console.log(loggedIn());
    if (!loggedIn()) {
        next({
            path: "/login"
        });
    } else {
        next();
    }
}

export function logout() {

    var config = {
        headers: getAuthHeader()
    };
    localStorage.removeItem("token");
    axios.get(baseUrl + 'auth/logout', config);
    window.location.reload();
    // EventBus.$emit('logout', 'logged out')


}

export function loggedIn() {
    let token = getToken();
    return !!token && !tokenNotExpired(token);
}

export function getToken() {
    return localStorage.getItem("token");
}

export function tokenExpirationDate(encodedToken) {
    let token = decode(encodedToken);
    if (!token.exp) {
        return null;
    }
    const date = new Date(0);
    date.setUTCSeconds(token.exp);
    return date;
}

export function tokenNotExpired(token) {
    let expirationDate = tokenExpirationDate(token);
    return expirationDate < new Date();
}

export function getAuthHeader() {
    return {
        "Authorization": "Bearer " + localStorage.getItem("token")
    };
}
