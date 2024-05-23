import { AxiosResponse } from "axios";
import { instance } from "common/instance";
import { BaseResponseType } from "common/types";
import {
  LoginTypeRequestType,
  UserDataType,
} from "features/Login/api/loginApi.types";

export const authAPI = {
  me() {
    return instance.get<BaseResponseType<UserDataType>>("auth/me");
  },
  login(data: LoginTypeRequestType) {
    return instance.post<
      BaseResponseType<{ userId: number }>,
      AxiosResponse<BaseResponseType<{ userId: number }>>,
      LoginTypeRequestType
    >(`auth/login`, data);
  },
  logout() {
    return instance.delete<BaseResponseType>(`auth/login`);
  },
};
