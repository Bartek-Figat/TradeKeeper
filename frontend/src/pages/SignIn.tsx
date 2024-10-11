import { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { handlePasswordDisplay } from "../lib/utils";
import Logo from "../components/Logo";
import { useLoginMutation } from "../services/apiCall";
import { useDispatch } from "react-redux"; // Import useDispatch
import { signIn } from "../slice/authSlice"; // Import signIn action

const signInSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

interface SignInFormValues {
  email: string;
  password: string;
  rememberPassword: boolean;
}

const SignInPage: FC = () => {
  const initialValues: SignInFormValues = {
    email: "",
    password: "",
    rememberPassword: false,
  };

  const [displayPassword, setDisplayPassword] = useState(false);
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateToken = (token: string) => {
    const tokenRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/; // Basic JWT format
    return token && tokenRegex.test(token);
  };

  return (
    <div className="col-span-7 flex min-h-screen flex-col items-center justify-center bg-gray-50 max-[1200px]:col-span-12">
      <div className="rounded-lg bg-white p-12 shadow-lg max-[375px]:p-4">
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
            const loginValues = {
              email: values.email,
              password: values.password,
            };
            try {
              const payload = await login(loginValues).unwrap(); // Await the login call
              console.log("Login successful:", payload);

              if (validateToken(payload.token)) {
                dispatch(signIn({ token: payload.token })); // Dispatch signIn action with the token
                navigate("/dashboard"); // Navigate to dashboard
              } else {
                alert("Invalid token format. Please try again.");
                navigate("/sign-in"); // Navigate back to sign-in if token is invalid
              }
            } catch (error) {
              console.error("Login failed:", error);
              alert(
                "Login failed. Please check your credentials and try again.",
              );
              navigate("/sign-in"); // Navigate back to sign-in on error
            }
            resetForm();
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="grid gap-4">
              <div className="flex flex-col">
                <label htmlFor="email" className="authentication-label mb-2">
                  Email
                </label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  className={`authentication-input rounded-md ${
                    errors.email && touched.email
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                <ErrorMessage name="email">
                  {(msg) => <div className="input-error-message">{msg}</div>}
                </ErrorMessage>
              </div>
              <div className="flex flex-col">
                <div className="mb-2 flex items-center justify-between">
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
                      className="flex cursor-pointer rounded-r-md bg-gray-100 px-3 py-2"
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
                </div>
              </div>
              <button
                type="submit"
                className="authentication-button bg-blue-500 text-white transition duration-300 hover:bg-blue-600"
                disabled={isSubmitting || isLoading}
              >
                {isSubmitting || isLoading ? "Signing In..." : "Sign In"}
              </button>
            </Form>
          )}
        </Formik>
        <p className="mt-5 text-center text-xs text-gray-500">
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
