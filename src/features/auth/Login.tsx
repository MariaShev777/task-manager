import Grid from '@mui/material/Grid';
import { Button, Checkbox, FormControlLabel, FormGroup, FormLabel } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { loginTC } from './auth-reducer';
import { useAppDispatch, useAppSelector } from 'app/store';
import { Navigate } from 'react-router-dom';
import { selectIsLoggedIn } from 'features/auth/login.selectors';

type FormikErrorsType = {
  email?: string;
  password?: string;
};

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
    onSubmit: (values) => {
      dispatch(loginTC(values));
      formik.resetForm();
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
