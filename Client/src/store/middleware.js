import { UNAUTHORIZED } from 'utils/httpStatus';
import { toast } from 'react-toastify';
import { SIGNIN_FAILED, SIGNUP_FAILED } from 'modules/auth/store/constant';

const showError = (action) => {
  let errorMsg = '';
  switch (action.type) {
    case SIGNUP_FAILED:
      errorMsg = SIGNUP_FAILED;
      break;
    case SIGNIN_FAILED:
      errorMsg = SIGNIN_FAILED;
      break;
    default:
      break;
  }
  if (errorMsg) {
    toast.error(errorMsg);
  }
};

const handleError = (action) => {
  const { payload } = action;
  if (payload) {
    const { status } = payload;
    switch (status) {
      case UNAUTHORIZED:
        toast.error('Unauthenticated');
        break;

      default:
        showError(action);
        break;
    }
  }
};

export const throwMiddleware = () => (next) => (action) => {
  if (action.type.indexOf('_FAILED') > 0) {
    handleError(action);
  }
  next(action);
};
