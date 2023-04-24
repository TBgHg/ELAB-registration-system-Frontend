import axios, { type AxiosInstance } from "axios";
import { apiEndpoint } from "@/constants/index";

/**
 * 用于请求API服务器的Axios实例。
 * @param accessToken 用户的AccessToken，若传入将会在Header自动设置Authorization的Header。
 * @returns AxiosInstance
 */
function createApiServerClient(accessToken?: string): AxiosInstance {
  const _accessToken = accessToken !== undefined ? accessToken : "";
  const headers: any = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  if (_accessToken !== "") {
    headers.Authorization = `Bearer ${_accessToken}`;
  }
  const client = axios.create({
    headers,
    baseURL: apiEndpoint,
  });
  return client;
}

export { createApiServerClient };
