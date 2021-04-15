export function responseOk(response) {
    return response.status >= 200 && response.status < 300;
};