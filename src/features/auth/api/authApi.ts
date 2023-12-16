import { AxiosResponse } from 'axios';
import { instance } from 'common/api';
import { LoginParamsType } from 'features/auth/api/authApi.types';
import { User } from 'common/types';
import { BaseResponse } from 'common/types';

export const authAPI = {
  login(data: LoginParamsType) {
    return instance.post<BaseResponse<{ userId: number }>, AxiosResponse<BaseResponse<{ userId: number }>>, LoginParamsType>(
      'auth/login',
      data,
    );
  },
  me() {
    return instance.get<BaseResponse<User>>(`auth/me`);
  },
  logout() {
    return instance.delete<BaseResponse>(`auth/login`);
  },
};
