import { FormikHelpers, useFormik } from 'formik';
import { authThunks } from 'features/auth/model/auth.reducer';
import { BaseResponse } from 'common/types';
import { useActions, useAppSelector } from 'common/hooks';
import { selectIsLoggedIn } from 'features/auth/model/auth.selectors';
import { LoginParams } from 'features/auth/api';

type FormikErrorsType = Partial<Omit<LoginParams, 'captcha'>>;

export const useLogin = () => {
  const { login } = useActions(authThunks);

  const isLoggedIn = useAppSelector<boolean>(selectIsLoggedIn);

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
    onSubmit: (values, formikHelpers: FormikHelpers<LoginParams>) => {
      login(values)
        .unwrap()
        .catch((err: BaseResponse) => {
          err.fieldsErrors?.forEach((fieldError) => {
            return formikHelpers.setFieldError(fieldError.field, fieldError.error);
          });
        });
    },
  });

  const errorsArray = Object.values(formik.errors);

  return { formik, isLoggedIn, errorsArray };
};
