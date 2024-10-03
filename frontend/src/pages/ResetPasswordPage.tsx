import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { handlePasswordDisplay } from "../lib/utils";
import Logo from "../components/Logo";

const resetPasswordSchema = yup.object().shape({
  currentPassword: yup.string().required("Current password is required"),
  newPassword: yup
    .string()
    .required("New password is required")
    .oneOf([yup.ref("confirmPassword")], "Passwords must match"),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
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
  const [displayNewPassword, setDisplayNewPassword] = useState(false);
  const [displayConfirmPassword, setDisplayConfirmPassword] = useState(false);

  return (
    <div className="col-span-7 flex flex-col items-center justify-center max-[1200px]:col-span-12 bg-gray-50 min-h-screen">
      <div className="p-12 max-[375px]:p-4 bg-white shadow-lg rounded-lg">
        <Logo />
        <div className="my-4 text-center">
          <p className="text-2xl font-semibold text-gray-800">Reset Password</p>
          <p className="text-sm text-gray-500">
            Hello John! Please reset your password.
          </p>
        </div>
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
            try {
              // Simulate a successful password reset process
              console.log("Password reset successful:", {
                currentPassword,
                newPassword,
                confirmPassword,
                rememberPassword,
              });
              alert("Password reset successful!");
            } catch (err) {
              console.error("Password reset failed:", err);
              alert("Password reset failed. Please try again.");
            }
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
                  Current Password
                </label>
                <div className="flex">
                  <Field
                    id="currentPassword"
                    name="currentPassword"
                    type={displayCurrentPassword ? "text" : "password"}
                    placeholder="Current password"
                    className={`authentication-input rounded-l-md ${
                      errors.currentPassword && touched.currentPassword
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  <div
                    onClick={() =>
                      handlePasswordDisplay(setDisplayCurrentPassword)
                    }
                    className="flex bg-gray-100 py-2 px-3 cursor-pointer rounded-r-md"
                  >
                    <img
                      className="w-4"
                      src={`/images/icon/${
                        displayCurrentPassword ? "eye" : "eye-slash"
                      }.svg`}
                      alt={`${
                        displayCurrentPassword
                          ? "hide password"
                          : "show password"
                      }`}
                      loading="lazy"
                    />
                  </div>
                </div>
                <ErrorMessage name="currentPassword">
                  {(msg) => <div className="input-error-message">{msg}</div>}
                </ErrorMessage>
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="newPassword"
                  className="authentication-label mb-2"
                >
                  New Password
                </label>
                <div className="flex">
                  <Field
                    id="newPassword"
                    name="newPassword"
                    type={displayNewPassword ? "text" : "password"}
                    placeholder="New password"
                    className={`authentication-input rounded-l-md ${
                      errors.newPassword && touched.newPassword
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  <div
                    onClick={() => handlePasswordDisplay(setDisplayNewPassword)}
                    className="flex bg-gray-100 py-2 px-3 cursor-pointer rounded-r-md"
                  >
                    <img
                      className="w-4"
                      src={`/images/icon/${
                        displayNewPassword ? "eye" : "eye-slash"
                      }.svg`}
                      alt={`${
                        displayNewPassword ? "hide password" : "show password"
                      }`}
                      loading="lazy"
                    />
                  </div>
                </div>
                <ErrorMessage name="newPassword">
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
              <button
                type="submit"
                className="authentication-button bg-blue-500 text-white hover:bg-blue-600 transition duration-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Resetting..." : "Reset"}
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

export default ResetPasswordPage;