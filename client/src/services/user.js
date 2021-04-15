import { privateApi } from '../config/axios-instance';

import { responseOk } from '../utils/responseOk';

export async function fetchUserInfo() {
    try {
        const response = await privateApi.get('/users/me');
        if(responseOk(response)) {
            return response.data;
        }
    } catch(error) {
        console.error(error);
    }
}