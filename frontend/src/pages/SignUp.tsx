import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { handlePasswordDisplay } from "../lib/utils";
import Logo from "../components/Logo";
import { useRegisterMutation } from "../services/apiCall"


// const { data: productsQuery, isLoading } =
//     useFilterAndPaginationProductsQuery({
//       page: currentPage,
//       ...queryParams,
//     });

const signUpSchema = yup.object().shape({
  email: yup.string().email("Email is required"),
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  password: yup
    .string()
    .required("Password is required")
    .oneOf([yup.ref("confirmPassword")], "Passwords must match"),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
  agreementToWebsitePolicy: yup
    .boolean()
    .oneOf(
      [true],
      "You must accept the terms and conditions and privacy policy to create an account"
    ),
});

interface SignUpFormValues {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  agreementToWebsitePolicy: boolean;
}

const SignUpPage: FC = () => {
  const [ userRegister ] = useRegisterMutation();

  const initialValues: SignUpFormValues = {
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    agreementToWebsitePolicy: false,
  };

  const [displayPassword, setDisplayPassword] = useState(false);
  const [displayConfirmPassword, setDisplayConfirmPassword] = useState(false);

  return (
    <div className="col-span-7 flex flex-col items-center justify-center max-[1200px]:col-span-12 bg-gray-50 min-h-screen">
      <div className="p-12 max-[375px]:p-4 bg-white shadow-lg rounded-lg">
        <Logo />
        <div className="my-4 text-center">
          <p className="text-2xl font-semibold text-gray-800">Sign Up</p>
          <p className="text-sm text-gray-500">
            Welcome & Join by creating a free account!
          </p>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={signUpSchema}
          onSubmit={(value: SignUpFormValues,{ resetForm }
          ) => {
<<<<<<< HEAD
            try {
              // Simulate a successful sign-up process
              console.log("Sign-up successful:", {
                firstName,
                lastName,
                password,
                confirmPassword,
                agreementToWebsitePolicy,
              });
              alert("Sign-up successful!");
            } catch (err) {
              console.error("Sign-up failed:", err);
              alert("Sign-up failed. Please try again.");
            }
=======
            
            userRegister(value).unwrap().then((payload) => console.log('fulfilled', payload))
            .catch((error) => console.error('rejected', error));;
>>>>>>> b02d96a6bbd3d2228f9375dc22de3c0886186fd2
            resetForm();
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="grid gap-4">
              {/*  */}
              <div>
                <label
                  htmlFor="email"
                  className="authentication-label mb-2"
                >
                  First Name
                </label>
                <Field
                  id="email"
                  name="email"
                  type="text"
                  placeholder="Email"
                  className="authentication-input rounded-md"
                  style={{
                    borderColor:
                      errors.firstName && touched.firstName ? "red" : null
                  }}
                />
                <ErrorMessage name="email">
                  {(msg) => (
                    <div className="input-error-message">{msg}</div>
                  )}
                </ErrorMessage>
              </div>
              {/*  */}
              <div>
                <label
                  htmlFor="firstName"
                  className="authentication-label mb-2"
                >
                  First Name
                </label>
                <Field
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  className={`authentication-input rounded-md ${
                    errors.firstName && touched.firstName
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                <ErrorMessage name="firstName">
                  {(msg) => <div className="input-error-message">{msg}</div>}
                </ErrorMessage>
              </div>
              <div>
                <label htmlFor="lastName" className="authentication-label mb-2">
                  Last Name
                </label>
                <Field
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  className={`authentication-input rounded-md ${
                    errors.lastName && touched.lastName
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                <ErrorMessage name="lastName">
                  {(msg) => <div className="input-error-message">{msg}</div>}
                </ErrorMessage>
              </div>
              <div className="flex flex-col">
                <label htmlFor="password" className="authentication-label mb-2">
                  Password
                </label>
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
                  {(msg) => <div className="input-error-message">{msg}</div>}
                </ErrorMessage>
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="confirmPassword"
                  className="authentication-label mb-2"
                >
                  Confirm Password
                </label>
                <div className="flex">
                  <Field
                    id="confirmPassword"
                    name="confirmPassword"
                    type={displayConfirmPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    className={`authentication-input rounded-l-md ${
                      errors.confirmPassword && touched.confirmPassword
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  <div
                    onClick={() =>
                      handlePasswordDisplay(setDisplayConfirmPassword)
                    }
                    className="flex bg-gray-100 py-2 px-3 cursor-pointer rounded-r-md"
                  >
                    <img
                      className="w-4"
                      src={`/images/icon/${
                        displayConfirmPassword ? "eye" : "eye-slash"
                      }.svg`}
                      alt={`${
                        displayConfirmPassword
                          ? "hide password"
                          : "show password"
                      }`}
                      loading="lazy"
                    />
                  </div>
                </div>
                <ErrorMessage name="confirmPassword">
                  {(msg) => <div className="input-error-message">{msg}</div>}
                </ErrorMessage>
              </div>
              <div className="flex items-center mt-4">
                <Field
                  id="agreementToWebsitePolicy"
                  name="agreementToWebsitePolicy"
                  type="checkbox"
                  className="authentication-checkbox"
                />
                <label
                  htmlFor="agreementToWebsitePolicy"
                  className="text-sm text-gray-500 pl-2 cursor-pointer"
                >
                  By creating an account you agree to our{" "}
                  <span className="text-blue-500 underline">
                    Terms & Conditions
                  </span>{" "}
                  and{" "}
                  <span className="text-blue-500 underline">
                    Privacy Policy
                  </span>
                </label>
              </div>
              <ErrorMessage name="agreementToWebsitePolicy">
                {(msg) => <div className="input-error-message">{msg}</div>}
              </ErrorMessage>
              <button
                type="submit"
                className="authentication-button bg-blue-500 text-white hover:bg-blue-600 transition duration-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing Up..." : "Sign Up"}
              </button>
            </Form>
          )}
        </Formik>
        <p className="text-gray-500 text-xs text-center mt-5">
          Already have an account?{" "}
          <Link to="/sign-in" className="text-blue-500 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
