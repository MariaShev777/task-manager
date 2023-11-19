import { Dispatch } from 'redux';
import { ResponseType } from 'api/todolists-api';
import { appActions } from 'app/app-reducer';

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: Dispatch) => {
  if (data.messages.length) {
    dispatch(appActions.setAppError({ error: data.messages[0] }));
  } else {
    dispatch(appActions.setAppError({ error: 'Some error occurred' }));
  }
  dispatch(appActions.setAppStatus({ status: 'failed' }));
};

export const handleServerNetworkError = (error: string, dispatch: Dispatch) => {
  dispatch(appActions.setAppError({ error: error }));
  dispatch(appActions.setAppStatus({ status: 'failed' }));
};
