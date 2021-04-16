import { privateApi } from "../config/axios-instance";
import { responseOk } from "../utils/responseOk";

export async function getAds() {
    let data = [];
    try {
        const response = await privateApi('/ads');
        if(responseOk(response)) {
            data = response.data;
        }
    } catch(err) {
        console.error(err);
    }
    return data;
};

export async function getAd(id) {
    let data = [];
    try {
        const response = await privateApi(`/ads/${id}`);
        if(responseOk(response)) {
            data = response.data;
        }
    } catch(err) {
        console.error(err);
    }
    return data;
};

export async function countUp(id) {
    let data = [];
    try {
        const response = await privateApi(`/ads/count/${id}`);
        if (responseOk(response)) {
            data = data.response;
        }
    } catch(err) {
        console.error(err);
    }
    return data;
};

export async function createAd(reqData) {
    let data = [];
    try {
        const response = await privateApi.post(`/ads`,{...reqData});
        if (responseOk(response)) {
            data = response.data;
        }
    } catch(error) {
        console.error(error);
    }
    return data;
};

export async function updateAd(reqData) {
    let data = [];
    try {
        const response = await privateApi.patch(`/ads/${reqData.id}`, {...reqData});
        if (responseOk(response)) {
            data = response.data;
        }
    } catch(error) {
        console.error(error);
    }
    return data;
};

export async function removeAd(id) {
    let data = [];
    try {
        const response = await privateApi.delete(`ads/${id}`);
        if (responseOk(response)) {
            data = response.data;
        }
    } catch(err) {
        console.log(err);
    }
    return data;
}