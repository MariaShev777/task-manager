import { AxiosResponse } from 'axios';
import { User } from 'common/types';
import { BaseResponse } from 'common/types';
import { instance } from 'common/api';
import { LoginParams } from 'features/auth/api/authApi.types';

export const authAPI = {
  login(data: LoginParams) {
    return instance.post<BaseResponse<{ userId: number }>, AxiosResponse<BaseResponse<{ userId: number }>>, LoginParams>(
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
