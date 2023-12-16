import { Dispatch } from 'redux';
import { appActions } from 'app/app.reducer';
import { BaseResponse } from 'common/types';

export const handleServerAppError = <T>(data: BaseResponse<T>, dispatch: Dispatch, showGlobalError = true) => {
  if (showGlobalError) {
    dispatch(appActions.setAppError({ error: data.messages.length ? data.messages[0] : 'Some error occurred' }));
  }
};
