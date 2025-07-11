import { stringify } from "qs";
import axios, { AxiosInstance, AxiosRequestConfig, RawAxiosRequestHeaders } from "axios";
import MockApi from "./mockapi";

export interface AxiosResponse<T> {
    data: T;
    status: number;
};

export const saveOnSessionStorage = (key: string, value: unknown) => {
    sessionStorage.setItem(key, JSON.stringify(value));
};

export const deleteFromSessionStorage = (key: string) => {
    sessionStorage.removeItem(key);
};

export const getOnSessionStorage = (key: string) => {
    return JSON.parse(sessionStorage.getItem(key) as string) || null;
};

const connectAxios = (axios: AxiosInstance): AxiosInstance => {
    return MockApi(axios, true);
};

export const AxiosGet = async <T = unknown>(
    url: string,
    params: Record<string, unknown> = {}
): Promise<AxiosResponse<T>> => {
    const options = (): AxiosRequestConfig => {
        return {
            responseType: "json",
            headers: getHeaders(),
            params: stringify(params),
            validateStatus: () => true,
            timeout: 6000
        };
    };

    return await connectAxios(axios)
    .get(url, options())
    .then((response) => {
        return {
            status: response.status,
            data: response.data,
        };
    })
    .catch((err) => {
        return {
            status: err.status,
            data: err.data,
        };
    });
};

export const AxiosPost = async <T = unknown>(
    url: string,
    body: Record<string, unknown> = {}
): Promise<AxiosResponse<T>> => {
    const options = (): AxiosRequestConfig => {
        return {
            headers: getHeaders(),
            validateStatus: () => true,
            timeout: 6000
        };
    };

    return await connectAxios(axios)
    .post(url, body, options())
    .then((response) => {
        return {
            status: response.status,
            data: response.data,
        };
    })
    .catch((err) => {
        return {
            status: err.status,
            data: err.data,
        };
    });
};

const getHeaders = (): Partial<RawAxiosRequestHeaders> => {
    return {
        "Content-Type": "application/json",
    }
}
