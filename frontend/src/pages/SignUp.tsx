import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { handlePasswordDisplay } from "../lib/utils";
import OtherOptionsLogin from "../components/OtherOptionsLogin";
import Logo from "../components/Logo";

const signUpSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  password: yup.string()
    .required("Password is required")
    .oneOf([yup.ref("confirmPassword")], "Passwords must match"),
  confirmPassword: yup.string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
  agreementToWebsitePolicy: yup.boolean().oneOf([true], "You must accept the terms and conditions and privacy policy to create an account"),
})

interface SignUpFormValues {
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  agreementToWebsitePolicy: boolean;
}

const SignUpPage: FC = () => {
  const initialValues: SignUpFormValues = {
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    agreementToWebsitePolicy: false,
  }

  const [displayPassword, setDisplayPassowrd] = useState(false);
  const [displayConfirmPassword, setDisplayConfirmPassword] = useState(false);

  return (
    <div className="col-span-7 flex flex-col items-center justify-center max-[1200px]:col-span-12">
      <div className="p-12 max-[375px]:p-4">
        <Logo />
        <div className="my-4">
          <p className="authentication-type">Sign Up</p>
          <p className="text-[0.8rem] text-[#8c9097]">
            Welcome & Join by creating a free account!
          </p>
        </div>
        <OtherOptionsLogin />
        <span className="authentication-span-with-gradient">OR</span>
        <Formik
          initialValues={initialValues}
          validationSchema={signUpSchema}
          onSubmit={(
            {
              firstName,
              lastName,
              password,
              confirmPassword,
              agreementToWebsitePolicy,
            }: SignUpFormValues,
            { resetForm }
          ) => {
            alert(
              `firstName: ${firstName},
              lastName: ${lastName},
              password: ${password},
              confirmPassword: ${confirmPassword},
              agreementToWebsitePolicy: ${agreementToWebsitePolicy}`
            )
            resetForm();
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="grid gap-4">
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
                  className="authentication-input rounded-md"
                  style={{
                    borderColor:
                      errors.firstName && touched.firstName ? "red" : null
                  }}
                />
                <ErrorMessage name="firstName">
                  {(msg) => (
                    <div className="input-error-message">{msg}</div>
                  )}
                </ErrorMessage>
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="authentication-label mb-2"
                >
                  Last Name
                </label>
                <Field
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  className="authentication-input rounded-md"
                  style={{
                    borderColor:
                      errors.lastName && touched.lastName ? "red" : null
                  }}
                />
                <ErrorMessage name="lastName">
                  {(msg) => (
                    <div className="input-error-message">{msg}</div>
                  )}
                </ErrorMessage>
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="password"
                  className="authentication-label mb-2"
                >
                  Password
                </label>
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
                    onClick={() => handlePasswordDisplay(setDisplayPassowrd)}
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
                    <div className="input-error-message">{msg}</div>
                  )}
                </ErrorMessage>
              </div>
              <div>
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
                      className="authentication-input rounded-l-md"
                      style={{
                        borderColor:
                          errors.confirmPassword && touched.confirmPassword ? "red" : null
                      }}
                    />
                    <div
                      onClick={() => handlePasswordDisplay(setDisplayConfirmPassword)}
                      className="flex bg-gray-100 py-2 px-3 cursor-pointer rounded-r-md">
                      <img
                        className="w-4"
                        src={`/images/icon/${displayConfirmPassword ? 'eye' : 'eye-slash'}.svg`}
                        alt={`${displayConfirmPassword ? 'hide password' : 'show password'}`}
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <ErrorMessage name="confirmPassword">
                    {(msg) => (
                      <div className="input-error-message">{msg}</div>
                    )}
                  </ErrorMessage>
                </div>
                <div>
                  <div className="flex items-center mt-4">
                    <Field
                      id="agreementToWebsitePolicy"
                      name="agreementToWebsitePolicy"
                      type="checkbox"
                      className="authentication-checkbox"
                      style={{
                        borderColor:
                          errors.agreementToWebsitePolicy && touched.agreementToWebsitePolicy ? "red" : null
                      }}
                    />
                    <label
                      htmlFor="agreementToWebsitePolicy"
                      className="text-[0.8rem] text-[#8c9097] pl-2 cursor-pointer"
                    >
                      By creating a account you agree to our <span className="text-[#28BF94] underline">Terms & Conditions</span> and <span className="text-[#28BF94] underline">Privacy Policy</span>
                    </label>
                  </div>
                  <ErrorMessage name="agreementToWebsitePolicy">
                    {(msg) => (
                      <div className="input-error-message">{msg}</div>
                    )}
                  </ErrorMessage>
                </div>
              </div>
              <button
                type="submit"
                className="authentication-button"
                disabled={isSubmitting}
              >
                Sign Up
              </button>
            </Form>
          )}
        </Formik>
        <p className="text-[#8c9097] text-xs text-center mt-5">
          Already have an account? <Link to="/sign-in" className="text-primary">Sign In</Link>
        </p>
      </div>
    </div >
  );
};

export default SignUpPage;