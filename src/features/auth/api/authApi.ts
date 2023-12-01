import { AxiosResponse } from 'axios';
import { instance } from 'common/api';
import { LoginDataType } from 'features/auth/api/authApi.types';
import { UserType } from 'common/types';
import { ResponseType } from 'common/types';

export const authAPI = {
  login(data: LoginDataType) {
    return instance.post<ResponseType<{ userId: number }>, AxiosResponse<ResponseType<{ userId: number }>>, LoginDataType>(
      'auth/login',
      data,
    );
  },
  me() {
    return instance.get<ResponseType<UserType>>(`auth/me`);
  },
  logout() {
    return instance.delete<ResponseType>(`auth/login`);
  },
};
