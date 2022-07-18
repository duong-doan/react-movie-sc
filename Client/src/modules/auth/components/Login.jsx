import React from 'react';
import { Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import FormGroup from 'components/FormGroup';

import BaseButton from 'components/BaseButton';
import { AUTH_ROUTES } from '../store/constant';
import TextLineThrough from 'components/TextLineThrough';
import useLogin from '../services/useLogin';

const Login = () => {
  const { loading, formik } = useLogin();
  return (
    <div className='login'>
      <div className='login__logo'>
        <h2>DOAN MOVIE</h2>
      </div>
      <div className='login__body'>
        <form className='form-signin' onSubmit={formik.handleSubmit}>
          <Typography
            variant='h3'
            fontWeight='bold'
            textAlign='center'
            marginBottom='20px'
            color='white'
            style={{
              textDecoration: 'line-through',
            }}
          >
            SIGN IN
          </Typography>
          <FormGroup
            id='email'
            name='email'
            label='Email'
            type='text'
            onChange={formik.handleChange}
            error={
              formik.errors.email && formik.touched.email
                ? formik.errors.email
                : ''
            }
          />
          <FormGroup
            id='password'
            name='password'
            label='Password'
            type='password'
            error={
              formik.errors.password && formik.touched.password
                ? formik.errors.password
                : ''
            }
            onChange={formik.handleChange}
          />

          <BaseButton
            width='50%'
            height='50px'
            color='primary'
            custom={{
              marginTop: '20px',
            }}
            type='submit'
            loading={loading}
          >
            SIGN IN
          </BaseButton>
        </form>
        <Typography variant='h6' color='primary'>
          Register account here.{' '}
          <NavLink to={AUTH_ROUTES.REGISTER}>
            <TextLineThrough
              custom={{ display: 'inline-block', marginLeft: '5px' }}
              color='white'
            >
              REGISTER
            </TextLineThrough>
          </NavLink>
        </Typography>
      </div>
    </div>
  );
};

export default Login;
