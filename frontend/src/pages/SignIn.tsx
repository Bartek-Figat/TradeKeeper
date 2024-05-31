import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { handlePasswordDisplay } from "../lib/utils";
import OtherOptionsLogin from "../components/OtherOptionsLogin";
import Logo from "../components/Logo";

const signInSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required")
});

interface SignInFormValues {
  username: string;
  password: string;
  rememberPassword: boolean;
}

const SignInPage: FC = () => {
  const initialValues: SignInFormValues = {
    username: "",
    password: "",
    rememberPassword: false,
  }

  const [displayPassword, setDisplayPassword] = useState(false);

  return (
    <div className="col-span-7 flex flex-col items-center justify-center max-[1200px]:col-span-12">
      <div className="p-12 max-[375px]:p-4">
        <Logo />
        <div className="my-4">
          <p className="authentication-type">Sign In</p>
          <p className="text-[0.8rem] text-[#8c9097]">Hello John!</p>
        </div>
        <OtherOptionsLogin />
        <span className="authentication-span-with-gradient">OR</span>
        <Formik
          initialValues={initialValues}
          validationSchema={signInSchema}
          onSubmit={(
            {
              username,
              password,
              rememberPassword,
            }: SignInFormValues,
            { resetForm }
          ) => {
            alert(
              `username: ${username},
              password: ${password},
              remember password: ${rememberPassword}`
            );
            resetForm();
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="grid gap-4">
              <div className="flex flex-col">
                <label
                  htmlFor="username"
                  className="authentication-label mb-2"
                >
                  User Name
                </label>
                <Field
                  id="username"
                  name="username"
                  type="text"
                  placeholder="User name"
                  className="authentication-input rounded-md"
                  style={{
                    borderColor:
                      errors.username && touched.username ? "red" : null
                  }}
                />
                <ErrorMessage name="username">
                  {(msg) => (
                    <div className="input-error-message">{msg}</div>
                  )}
                </ErrorMessage>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <label
                    htmlFor="password"
                    className="authentication-label"
                  >
                    Password
                  </label>
                  <Link
                    to="/reset-password"
                    className="text-[0.8rem] font-semibold text-red-500 cursor-pointer"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div>
                  <div className="flex">
                    <Field
                      id="password"
                      name="password"
                      type={displayPassword ? "text" : "password"}
                      placeholder="Password"
                      className="authentication-input rounded-l-md"
                      style={{
                        borderColor:
                          errors.password && touched.password ? "red" : null
                      }}
                    />
                    <div
                      onClick={() => handlePasswordDisplay(setDisplayPassword)}
                      className="flex bg-gray-100 py-2 px-3 cursor-pointer rounded-r-md">
                      <img
                        className="w-4"
                        src={`/images/icon/${displayPassword ? 'eye' : 'eye-slash'}.svg`}
                        alt={`${displayPassword ? 'hide password' : 'show password'}`}
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <ErrorMessage name="password">
                    {(msg) => (
                      <div className="input-error-message mb-2">{msg}</div>
                    )}
                  </ErrorMessage>
                  <div className="flex items-center mt-2">
                    <Field
                      id="rememberPassword"
                      name="rememberPassword"
                      type="checkbox"
                      className="authentication-checkbox"
                    />
                    <label
                      htmlFor="rememberPassword"
                      className="text-[0.8rem] text-[#8c9097] pl-2 cursor-pointer"
                    >
                      Remember password?
                    </label>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="authentication-button"
                disabled={isSubmitting}
              >
                Sign In
              </button>
            </Form>
          )}
        </Formik>
        <p className="text-[#8c9097] text-xs text-center mt-5">
          Don't have an account? <Link to="/sign-up" className="text-primary">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default SignInPage;