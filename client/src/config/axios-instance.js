import axios from 'axios';
import Cookies from 'js-cookie';

const apiURL = () =>
    `${process.env.REACT_APP_SERVICE_BASE_URL}/api`;
export const apiURLv1 = apiURL();

export const privateApi = axios.create({
    baseURL: apiURLv1,
    headers: {
        'Content-type': 'application/json',
    },
});

export function attachAuthorizationHeader(token) {
    privateApi.defaults.headers.common[
        'Authorization'
    ] = `Bearer ${token}`.trim();
};

attachAuthorizationHeader(Cookies.get('access_token') || '');

export function removeCookies() {
    Cookies.remove('access_token');
};

