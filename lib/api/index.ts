// lib/api/index.ts
import http from "../axios";
import withServerInterceptor from "./interceptor";
import { IApiResponse, ResponseObject } from "@/types";
import { trackPromise } from "react-promise-tracker";

export const httpGet = async <T>(url: string) => {
  return await trackPromise(
    withServerInterceptor(
      url,
      async () => await http.get<IApiResponse<T>>(url)
    )
  );
};

export const httpPost = async <T>(
  url: string,
  data?: object,
  config: object = {}
) => {
  return await trackPromise(
    withServerInterceptor(
      url,
      async () => await http.post<IApiResponse<T>>(url, data, config)
    )
  );
};

export const httpDelete = async <T>(url: string) => {
  return await trackPromise(
    withServerInterceptor(
      url,
      async () => await http.delete<IApiResponse<T>>(url)
    )
  );
};

export const handleErrors = (errorResp: ResponseObject<unknown>): ResponseObject<unknown> => {
  return {
    errors: errorResp?.errors || ['An unexpected error occurred'],
    messages: errorResp?.messages || [],
  };
};
