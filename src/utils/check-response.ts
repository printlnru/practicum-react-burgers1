import { API_BASE_PATH } from "../services/api/config";


export function checkResponse(res:Response) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
}


export function requestWithCheckResponse(endpoint:string, options?: any) {
    // принимает два аргумента: урл и объект опций, как и `fetch`
    return fetch(API_BASE_PATH + endpoint, options).then(checkResponse)
  }