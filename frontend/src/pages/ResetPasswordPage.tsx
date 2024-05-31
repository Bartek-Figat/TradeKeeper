import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { handlePasswordDisplay } from "../lib/utils";
import OtherOptionsLogin from "../components/OtherOptionsLogin";
import Logo from "../components/Logo";

const resetPasswordSchema = yup.object().shape({
  currentPassword: yup.string().required('Current password is required'),
  newPassword: yup.string()
    .required("New password is required")
    .oneOf([yup.ref("confirmPassword")], 'Passwords must match'),
  confirmPassword: yup.string()
    .required('Confirm password is required')
    .oneOf([yup.ref("newPassword")], "Passwords must match"),
  rememberPassword: yup.boolean(),
});

interface ResetPasswordValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  rememberPassword: boolean;
}

const ResetPasswordPage: FC = () => {
  const initialValues: ResetPasswordValues = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    rememberPassword: false,
  };

  const [displayCurrentPassword, setDisplayCurrentPassword] = useState(false);
  const [displayNewPassword, setDisplayNewPassowrd] = useState(false);
  const [displayConfirmPassword, setDisplayConfirmPassword] = useState(false);

  return (
    <div className="col-span-7 flex flex-col items-center justify-center max-[1200px]:col-span-12">
      <div className="p-12 max-[375px]:p-4">
        <Logo />
        <div className="my-4">
          <p className="authentication-type">Reset Password</p>
          <p className="text-[0.8rem] text-[#8c9097]">Hello John!</p>
        </div>
        <OtherOptionsLogin />
        <span className="authentication-span-with-gradient">OR</span>
        <Formik
          initialValues={initialValues}
          validationSchema={resetPasswordSchema}
          onSubmit={(
            {
              currentPassword,
              newPassword,
              confirmPassword,
              rememberPassword,
            }: ResetPasswordValues,
            { resetForm }
          ) => {
            alert(`
              currentPassword: ${currentPassword},
              newPassword: ${newPassword},
              confirmPassword: ${confirmPassword},
              rememberPassword: ${rememberPassword}`
            );
            resetForm();
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="grid gap-4">
              <div className="flex flex-col">
                <label
                  htmlFor="currentPassword"
                  className="authentication-label mb-2"
                >
                  Current Passowrd
                </label>
                <div className="flex">
                  <Field
                    id="currentPassword"
                    name="currentPassword"
                    type={displayCurrentPassword ? "text" : "password"}
                    placeholder="Current password"
                    className="authentication-input rounded-l-md"
                    style={{
                      borderColor:
                        errors.currentPassword && touched.currentPassword ? "red" : null
                    }}
                  />
                  <div
                    onClick={() => handlePasswordDisplay(setDisplayCurrentPassword)}
                    className="flex bg-gray-100 py-2 px-3 cursor-pointer rounded-r-md">
                    <img
                      className="w-4"
                      src={`/images/icon/${displayCurrentPassword ? 'eye' : 'eye-slash'}.svg`}
                      alt={`${displayCurrentPassword ? 'hide password' : 'show password'}`}
                      loading="lazy"
                    />
                  </div>
                </div>
                <ErrorMessage name="currentPassword">
                  {(msg) => (
                    <div className="input-error-message">{msg}</div>
                  )}
                </ErrorMessage>
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="newPassword"
                  className="authentication-label mb-2"
                >
                  New Passowrd
                </label>
                <div className="flex">
                  <Field
                    id="newPassword"
                    name="newPassword"
                    type={displayNewPassword ? "text" : "password"}
                    placeholder="New password"
                    className="authentication-input rounded-l-md"
                    style={{
                      borderColor:
                        errors.newPassword && touched.newPassword ? "red" : null
                    }}
                  />
                  <div
                    onClick={() => handlePasswordDisplay(setDisplayNewPassowrd)}
                    className="flex bg-gray-100 py-2 px-3 cursor-pointer rounded-r-md">
                    <img
                      className="w-4"
                      src={`/images/icon/${displayNewPassword ? 'eye' : 'eye-slash'}.svg`}
                      alt={`${displayNewPassword ? 'hide password' : 'show password'}`}
                      loading="lazy"
                    />
                  </div>
                </div>
                <ErrorMessage name="newPassword">
                  {(msg) => (
                    <div className="input-error-message">{msg}</div>
                  )}
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
                    placeholder="Confirm Password"
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
              <button
                type="submit"
                className="authentication-button"
                disabled={isSubmitting}
              >
                Reset
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
}

export default ResetPasswordPage;