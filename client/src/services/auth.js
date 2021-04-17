import Cookies from 'js-cookie';

import {
    attachAuthorizationHeader,
    privateApi,
} from '../config/axios-instance';

import { responseOk } from '../utils/responseOk';

import { UserContext } from '../contexts/UserContext';

export async function loginUser({
    username,
    password,
}) {
    const response = await privateApi.post('/auth/login', {
        username,
        password,
    });

    const {
        data: { token },
    } = response;
    
    if (responseOk(response)) {
        
        attachAuthorizationHeader(token);
        storeTokenInformationToCookies({
            token,
        });
    }

    return response;
}

export async function registerUser(data) {
    const response = await privateApi.post(`/auth/register`, data);
    const { user } = response.data;
    return user;
}

function storeTokenInformationToCookies({
    token,
}) {
    Cookies.set('access_token', token);
}

export function parseJwt() {
    const token = Cookies.get('access_token');

    if (!token) { 
        return; 
    }

    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');

    return JSON.parse(window.atob(base64));
}