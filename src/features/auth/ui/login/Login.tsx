import Grid from '@mui/material/Grid';
import { Button, Checkbox, FormControlLabel, FormGroup, FormLabel } from '@mui/material';
import TextField from '@mui/material/TextField';
import { FormikHelpers, useFormik } from 'formik';
import { Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { selectIsLoggedIn } from 'features/auth/model/auth.selectors';
import { authThunks } from 'features/auth/model/auth.reducer';
import { BaseResponseType } from 'common/types';
import { LoginParamsType } from 'features/auth/api/authApi.types';

type FormikErrorsType = Partial<Omit<LoginParamsType, 'captcha'>>;

export const Login = () => {
  const isLoggedIn = useAppSelector<boolean>(selectIsLoggedIn);

  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validate: (values) => {
      const errors: FormikErrorsType = {};
      if (!values.email) {
        errors.email = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }

      if (!values.password) {
        errors.password = 'Required';
      } else if (values.password.length <= 3) {
        errors.password = 'Password is too short';
      }
      return errors;
    },
    onSubmit: (values, formikHelpers: FormikHelpers<LoginParamsType>) => {
      dispatch(authThunks.login(values))
        .unwrap()
        .catch((err: BaseResponseType) => {
          err.fieldsErrors?.forEach((fieldError) => {
            return formikHelpers.setFieldError(fieldError.field, fieldError.error);
          });
        });
    },
  });

  const errorsArray = Object.values(formik.errors);

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <Grid container justifyContent={'center'}>
      <Grid item justifyContent={'center'}>
        <form onSubmit={formik.handleSubmit}>
          <FormLabel>
            <p>
              To log in get registered
              <a href={'https://social-network.samuraijs.com/'} target={'_blank'}>
                {' '}
                here
              </a>
            </p>
            <p>or use common test account credentials:</p>
            <p>Email: free@samuraijs.com</p>
            <p>Password: free</p>
          </FormLabel>
          <FormGroup>
            <TextField label="Email" margin="normal" {...formik.getFieldProps('email')} />
            {formik.touched.email && formik.errors.email ? <div style={{ color: 'red' }}>{formik.errors.email}</div> : null}

            <TextField label="Password" type="password" margin="normal" {...formik.getFieldProps('password')} />
            {formik.touched.password && formik.errors.password ? <div style={{ color: 'red' }}>{formik.errors.password}</div> : null}

            <FormControlLabel label="Remember me" control={<Checkbox {...formik.getFieldProps('rememberMe')} />} />
            <Button type="submit" variant={'contained'} color={'primary'} disabled={!!errorsArray.length}>
              Login
            </Button>
          </FormGroup>
        </form>
      </Grid>
    </Grid>
  );
};
