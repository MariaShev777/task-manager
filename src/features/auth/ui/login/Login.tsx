import Grid from '@mui/material/Grid';
import { Button, Checkbox, FormControlLabel, FormGroup, FormLabel } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Navigate } from 'react-router-dom';
import { useLogin } from 'features/auth/lib';

export const Login = () => {
  const { formik, isLoggedIn, errorsArray } = useLogin();

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
