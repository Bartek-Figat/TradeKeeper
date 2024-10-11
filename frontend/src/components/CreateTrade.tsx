import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

const tradeSchema = yup.object().shape({
  tradeSymbol: yup
    .string()
    .min(3, "Trade Symbol must be at least 3 characters long")
    .required("Trade Symbol is required"),
  limitPrice: yup.number().required("Limit Price is required"),
  profitTarget: yup.number().required("Profit Target is required"),
  quantity: yup.number().required("Quantity is required"),
  paidPrice: yup.number().required("Paid Price is required"),
  fee: yup.number().required("Fee is required"),
  market: yup.string().required("Market is required"),
});

interface MyFormValues {
  tradeSymbol: string;
  limitPrice: string;
  profitTarget: string;
  quantity: string;
  paidPrice: string;
  fee: string;
  market: string;
}

const CreateTrade: React.FC = () => {
  const initialValues: MyFormValues = {
    tradeSymbol: "",
    limitPrice: "",
    profitTarget: "",
    quantity: "",
    paidPrice: "",
    fee: "",
    market: "",
  };

  return (
    <section className="my-auto py-10 dark:bg-gray-900">
      <div className="mx-auto max-w-4xl bg-white p-16">
        <Formik
          initialValues={initialValues}
          validationSchema={tradeSchema}
          onSubmit={(values, { resetForm }) => {
            alert(`Trade Created: ${JSON.stringify(values, null, 2)}`);
            resetForm();
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <div className="mb-6 grid gap-6 lg:grid-cols-2">
                {[
                  { id: "tradeSymbol", label: "Trade Symbol", type: "text" },
                  { id: "limitPrice", label: "Limit Price", type: "number" },
                  {
                    id: "profitTarget",
                    label: "Profit Target",
                    type: "number",
                  },
                  { id: "quantity", label: "Quantity", type: "number" },
                  { id: "paidPrice", label: "Paid Price", type: "number" },
                  { id: "fee", label: "Fee", type: "number" },
                ].map(({ id, label, type }) => (
                  <div key={id}>
                    <label
                      htmlFor={id}
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      {label}
                    </label>
                    <Field
                      id={id}
                      name={id}
                      type={type}
                      className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 ${
                        errors[id] && touched[id] ? "border-red-600" : ""
                      }`}
                      placeholder={label}
                    />
                    <ErrorMessage name={id}>
                      {(msg) => (
                        <div className="mt-1 text-sm text-red-600">{msg}</div>
                      )}
                    </ErrorMessage>
                  </div>
                ))}
                <div>
                  <label
                    htmlFor="market"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Market
                  </label>
                  <Field
                    as="select"
                    id="market"
                    name="market"
                    className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 ${
                      errors.market && touched.market ? "border-red-600" : ""
                    }`}
                  >
                    <option value="" disabled hidden>
                      Select Market
                    </option>
                    <option value="stock">Stock</option>
                    <option value="forex">Forex</option>
                    <option value="crypto">Crypto</option>
                  </Field>
                  <ErrorMessage name="market">
                    {(msg) => (
                      <div className="mt-1 text-sm text-red-600">{msg}</div>
                    )}
                  </ErrorMessage>
                </div>
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
                disabled={isSubmitting}
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default CreateTrade;
