import { AxiosResponse } from 'axios';
import { instance } from 'common/api';
import { LoginParamsType } from 'features/auth/api/authApi.types';
import { UserType } from 'common/types';
import { BaseResponseType } from 'common/types';

export const authAPI = {
  login(data: LoginParamsType) {
    return instance.post<BaseResponseType<{ userId: number }>, AxiosResponse<BaseResponseType<{ userId: number }>>, LoginParamsType>(
      'auth/login',
      data,
    );
  },
  me() {
    return instance.get<BaseResponseType<UserType>>(`auth/me`);
  },
  logout() {
    return instance.delete<BaseResponseType>(`auth/login`);
  },
};
