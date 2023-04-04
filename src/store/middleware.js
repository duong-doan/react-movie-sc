import { FORBIDDEN, UNAUTHORIZED } from 'utils/httpStatus';
import { toast } from 'react-toastify';
import { SIGNIN_FAILED, SIGNUP_FAILED } from 'modules/auth/store/constant';
import { store } from './index';
import { logoutRequest } from 'modules/auth/store/actions';

const showError = (action) => {
  let errorMsg = '';
  switch (action.type) {
    case SIGNUP_FAILED:
      errorMsg = action.payload;
      break;
    case SIGNIN_FAILED:
      errorMsg = action.payload;
      break;
    default:
      break;
  }
  if (errorMsg) {
    toast.error(errorMsg);
  }
};

const HandleError = (action) => {
  const { payload } = action;
  if (payload) {
    const { status, message } = payload;
    switch (status) {
      case UNAUTHORIZED:
        toast.error('Unauthenticated');
        break;
      case FORBIDDEN:
        store.dispatch(logoutRequest());
        toast.error(message);
        break;
      default:
        showError(action);
        break;
    }
  }
};

export const throwMiddleware = () => (next) => (action) => {
  if (action.type.indexOf('_FAILED') > 0) {
    HandleError(action);
  }
  next(action);
};
