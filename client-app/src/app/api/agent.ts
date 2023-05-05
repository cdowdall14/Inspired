import { Activity } from './../models/Activity';
import axios, { AxiosResponse } from 'axios';

const sleep = (delay: number) => {
    return new Promise(resolve => {
        setTimeout(resolve, delay);
    });
};

axios.defaults.baseURL = 'https://localhost:5001/api';

axios.interceptors.response.use(async response => {
    try {
        await sleep(1000);
        return response;
    } catch (e) {
        console.log(e);
        return await Promise.reject(e);
    }
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),

    post: <T>(url: string, body: {}) =>
        axios.post<T>(url, body).then(responseBody),

    put: <T>(url: string, body: {}) =>
        axios.put<T>(url, body).then(responseBody),

    del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Activities = {
    list: () => requests.get<Activity[]>('/Activities'),
    details: (id: string) => requests.get<Activity>(`/Activities/${id}`),
    create: (activity: Activity) => axios.post<void>('/Activities', activity),
    update: (activity: Activity) =>
        axios.put<void>(`/Activities/${activity.id}`, activity),
    delete: (id: string) => axios.delete<void>(`/Activities/${id}`),
};

const agent = {
    Activities,
};

export default agent;
