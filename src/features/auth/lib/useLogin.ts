import { FormikHelpers, useFormik } from 'formik';
import { LoginParamsType } from 'features/auth/api/authApi.types';
import { authThunks } from 'features/auth/model/auth.reducer';
import { BaseResponseType } from 'common/types';
import { useActions } from 'common/hooks/useActions';
import { useAppSelector } from 'common/hooks';
import { selectIsLoggedIn } from 'features/auth/model/auth.selectors';

type FormikErrorsType = Partial<Omit<LoginParamsType, 'captcha'>>;

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
    onSubmit: (values, formikHelpers: FormikHelpers<LoginParamsType>) => {
      login(values)
        .unwrap()
        .catch((err: BaseResponseType) => {
          err.fieldsErrors?.forEach((fieldError) => {
            return formikHelpers.setFieldError(fieldError.field, fieldError.error);
          });
        });
    },
  });

  const errorsArray = Object.values(formik.errors);

  return { formik, isLoggedIn, errorsArray };
};
