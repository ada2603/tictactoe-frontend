import axios from 'axios';
import { apiURI } from './config';
import { getToken } from './utils/auth';

const token = getToken().get('idToken');
const bearerAuth = () => `${token}`;

const httpClient = axios.create({
    baseURL: apiURI,
    timeout: 3000,
    headers: {Authorization: token ? 'Bearer '.concat(bearerAuth()) : ''}
});
httpClient.interceptors.response.use(function (response) {
    return response.data;
  }, function (error) {
    return Promise.reject(error);
});

const request = (api, opt) => {
    const options = opt || { method: 'GET' };
    options.headers = {
      'Content-Type': 'application/json',
    };
    const token = getToken().get('idToken');
    if (token) {
      options.headers.Authorization = `Bearer ${token}`;
    }
    const url = apiURI + api;
    return axios(url, options)
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
        return { message: 'Unknown Server Error' };
    });
}

export const requests = {
    get: (url, params = {}) => {
        return request(url, {
        method: 'GET', params: params
    })},
    put: (url, body) =>
        {return httpClient.put(url, body)},
    post: (url, body) =>
        {return request(url, { method: 'POST', data: body })},
    patch: (url, body) =>
         {return request(url, { method: 'PATCH', data: body })},
    delete: (url) =>
         {return request(url, { method: 'DELETE' })},
};