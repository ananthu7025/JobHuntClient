// lib/actions/auth.ts
"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { httpPost } from "../api";
import { API_ENDPOINTS } from "@/config/api";
import { 
  LoginData, 
  LoginResponse, 
  ResponseObject 
} from "@/types";
import { setAccessToken } from "../cookies";

export const login = async (
  data: LoginData
): Promise<ResponseObject<LoginResponse>> => {
  let response: ResponseObject<LoginResponse> = {
    errors: [],
    messages: [],
  };

  try {
    // resp is already ResponseObject<LoginResponse>
    const resp = await httpPost<LoginResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      data
    );
    
    console.log(resp, "frontend ResponseObject");

    if (resp.data?.token) {
      // Save token in cookies
      setAccessToken(resp.data.token);

      response = {
        ...resp,
        redirect: "/dashboard", // keep your redirect logic
      };
    } else if (resp.errors.length) {
      response.errors = resp.errors;
    } else {
      response.errors.push("Unexpected server response");
    }
  } catch (err: any) {
    console.error("Login error:", err);
    response.errors.push("Something went wrong, please try again later");
  }

  console.log(response,'Res')
  return response;
};
