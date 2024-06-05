import { message as AntdMessage } from "antd";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import Router from "next/router";

interface AxiosInstanceType extends AxiosInstance {
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  head<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  options<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;

}

export const CreateAxiosInstance = (config?: AxiosRequestConfig): AxiosInstanceType => {
  const instance = axios.create({
    timeout: 5000,
    ...config,
  });

  instance.interceptors.request.use(
    function (config) {
      return config;// 在发送请求之前做些什么
    },
    function (error) {
      return Promise.reject(error);// 对请求错误做些什么
    }
  );

  instance.interceptors.response.use(
    function (response) {// 对响应数据做点什么
      // 是否已经登陆，是否成功
      const { status, data, message } = response as any;
      if (status === 200) {
        console.log("200");
        return data;
      } else if (status === 401) {
        // 没权限或者没登陆
        return Router.push("/login");
      }
      else if (status === 201) {
        // 创建成功
        AntdMessage.success(message || "create success!!");
        return data;
      }
      else {
        // 其他error
        AntdMessage.error(message || "服务端异常1");
      }
    },
    function (error) {// 对响应错误做点什么
      if (error.response && error.response.status === 401) {
        return Router.push("/login");
      }
      AntdMessage.error(error?.response?.data?.message || "服务端异常2");
      return Promise.reject(error);
    }
  );

  return instance;
};

export default CreateAxiosInstance({});