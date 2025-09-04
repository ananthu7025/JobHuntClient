// server interceptor
import { AxiosResponse } from "axios";
import { IApiResponse, ErrorResponse, ResponseObject } from "@/types";

export default async function withServerInterceptor<TData>(
  url: string,
  serverAction: () => Promise<AxiosResponse<IApiResponse<TData>>>,
): Promise<ResponseObject<TData>> {
  const response: ResponseObject<TData> = {
    errors: [],
    messages: [],
  };

  try {
    const resp = await serverAction();
    console.log(">>> resp >> ", resp.config?.url);

    if (resp.data.success) {
      response.data = resp.data.data;
      response.messages = [resp.data.message || "Request successful."];
    } else {
      response.errors = [resp.data.error || resp.data.message || "Unknown error"];
    }
  } catch (err: unknown) {
    const errorResp = err as ErrorResponse;
    console.log("Interceptor error", errorResp);

    if (errorResp.status === 401) {
      response.errors = ["Session expired. Please log in again."];
      response.sessionOut = true;
    } else {
      const apiError =
        errorResp?.response?.data?.error ||
        errorResp?.response?.data?.message ||
        "An unexpected error occurred. Please try again later.";
      response.errors = [apiError];
    }
  }

  return response;
}
