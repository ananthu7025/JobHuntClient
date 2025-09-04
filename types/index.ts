/* eslint-disable @typescript-eslint/no-explicit-any */
// types/index.ts
import { AxiosResponse } from "axios";

// Base API Response interface
export interface IApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

// Generic response object for client-side handling
export interface ResponseObject<T = any> {
  data?: T;
  messages: string[];
  errors: string[];
  redirect?: string; // Changed from 'red' to be more descriptive
  sessionOut?: boolean;
}

// Error response interface
export interface ErrorResponse {
  response?: AxiosResponse<IApiResponse>;
  status?: number;
}

// Auth-specific types
export interface LoginData {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

// Alternative: If you want a success indicator, you could use this pattern instead
export interface ApiResult<T = any> {
  success: boolean;
  data?: T;
  errors: string[];
  messages: string[];
  redirect?: string;
}

// Nationality response type
export interface NationalityResponse {
  id: string;
  name: string;
  code?: string;
}

// City type
export interface City {
  cityID: number;
  cityName: string;
  countryId?: number;
}

// Country type
export interface Country {
  countryID: number;
  countryName: string;
}

// Nationality type  
export interface Nationality {
  nationalityID: number;
  nationalityName: string;
  nationalityNameArb?: string;
}

// Select item for dropdowns
export interface SelectItem {
  value: string | number;
  label: string;
}

// Response types for API calls
export interface CountryResponse {
  countries: Country[];
}

export interface CityResponse {
  cities: City[];
}

export interface DocList {
  id: string;
  name: string;
  type?: string;
}
