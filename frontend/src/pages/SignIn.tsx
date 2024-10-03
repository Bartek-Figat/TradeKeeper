import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { handlePasswordDisplay } from "../lib/utils";
import Logo from "../components/Logo";
import { useLoginMutation } from "../services/apiCall";

const signInSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
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
  };

  const [displayPassword, setDisplayPassword] = useState(false);
  const [login] = useLoginMutation();

  return (
    <div className="col-span-7 flex flex-col items-center justify-center max-[1200px]:col-span-12 bg-gray-50 min-h-screen">
      <div className="p-12 max-[375px]:p-4 bg-white shadow-lg rounded-lg">
        <Logo />
        <div className="my-4 text-center">
          <p className="text-2xl font-semibold text-gray-800">Sign In</p>
          <p className="text-sm text-gray-500">
            Welcome back! Please sign in to your account.
          </p>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={signInSchema}
          onSubmit={async (values, { resetForm }) => {
            try {
              const response = await login(values).unwrap();
              console.log("Login successful:", response);
              // Add user feedback for successful login
              alert("Login successful!");
            } catch (err) {
              console.error("Login failed:", err);
              // Add user feedback for failed login
              alert(
                "Login failed. Please check your credentials and try again."
              );
            }
            resetForm();
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="grid gap-4">
              <div className="flex flex-col">
                <label htmlFor="username" className="authentication-label mb-2">
                  User Name
                </label>
                <Field
                  id="username"
                  name="username"
                  type="text"
                  placeholder="User name"
                  className={`authentication-input rounded-md ${
                    errors.username && touched.username
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                <ErrorMessage name="username">
                  {(msg) => <div className="input-error-message">{msg}</div>}
                </ErrorMessage>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="password" className="authentication-label">
                    Password
                  </label>
                  <Link
                    to="/reset-password"
                    className="text-sm font-semibold text-blue-500 hover:underline"
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
                      className={`authentication-input rounded-l-md ${
                        errors.password && touched.password
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    <div
                      onClick={() => handlePasswordDisplay(setDisplayPassword)}
                      className="flex bg-gray-100 py-2 px-3 cursor-pointer rounded-r-md"
                    >
                      <img
                        className="w-4"
                        src={`/images/icon/${
                          displayPassword ? "eye" : "eye-slash"
                        }.svg`}
                        alt={`${
                          displayPassword ? "hide password" : "show password"
                        }`}
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
                      className="text-sm text-gray-500 pl-2 cursor-pointer"
                    >
                      Remember password?
                    </label>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="authentication-button bg-blue-500 text-white hover:bg-blue-600 transition duration-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing In..." : "Sign In"}
              </button>
            </Form>
          )}
        </Formik>
        <p className="text-gray-500 text-xs text-center mt-5">
          Don't have an account?{" "}
          <Link to="/sign-up" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
