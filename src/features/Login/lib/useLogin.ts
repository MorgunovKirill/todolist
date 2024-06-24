import { useActions } from "../../../common/hooks/useActions";
import { FormikHelpers, useFormik } from "formik";
import { LoginType } from "../api/loginApi.types";
import { rejectedValueOrSerializedError } from "../../../common/types/types";
import { useAppSelector } from "../../../common/utils";
import { isLoggedSelector } from "../model/isLoggedSelector";

type FormikErrorType = {
  email?: string;
  password?: string;
  rememberMe?: boolean;
};

export const useLogin = () => {
  const { login } = useActions();
  const isLoggedIn = useAppSelector(isLoggedSelector);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validate: (values) => {
      const errors: FormikErrorType = {};
      if (!values.email) {
        errors.email = "Required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }
      if (!values.password) {
        errors.password = "Required";
      }
      return errors;
    },
    onSubmit: async (values, formikHelpers: FormikHelpers<LoginType>) => {
      try {
        await login(values).unwrap();
      } catch (err) {
        const errors = (err as rejectedValueOrSerializedError).fieldsErrors;
        errors &&
          errors.forEach((el) => {
            formikHelpers.setFieldError(el.field, el.error);
          });
      }
    },
    // formik.resetForm()
  });

  return { formik, isLoggedIn };
};
