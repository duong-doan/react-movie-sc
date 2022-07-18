import { useEffect } from 'react';
import * as actions from 'modules/auth/store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import {
  selectUserToken,
  selectUserLoading,
} from 'modules/auth/store/selector';
import { useNavigate } from 'react-router-dom';
import { HOME_ROUTES } from 'modules/home/store/constants';

const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector(selectUserLoading);
  const token = useSelector(selectUserToken);

  useEffect(() => {
    if (token) {
      navigate(HOME_ROUTES.HOME, { replace: true });
    }
  }, [token, navigate]);

  const loginSchema = Yup.object().shape({
    email: Yup.string().email(),
    password: Yup.string().min(8),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = (values) => {
    const { email } = values;
    dispatch(actions.authLoginRequest({ email }));
  };

  return {
    loading,
    formik,
  };
};

export default useLogin;
