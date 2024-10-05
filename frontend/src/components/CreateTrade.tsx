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

const CreateTrade = () => {
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
    <div className="min-h-screen bg-blue-50 dark:bg-slate-800 p-0 sm:p-12 flex items-center justify-center">
      <div className="relative mx-auto max-w-lg px-4 py-4 bg-white border-2 border-indigo-500 rounded-lg shadow-lg">
        <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-indigo-500 rounded-lg"></span>
        <div className="relative p-6 bg-white border-2 border-indigo-500 rounded-lg">
          <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
            Create Trade
          </h1>
          <p className="mb-6 text-center text-gray-600">
            Fill in the details below to create a new trade. Ensure all fields
            are completed accurately to avoid any issues.
          </p>
          <Formik
            initialValues={initialValues}
            validationSchema={tradeSchema}
            onSubmit={(values, { resetForm }) => {
              alert(`Trade Created: ${JSON.stringify(values, null, 2)}`);
              resetForm();
            }}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className="space-y-6">
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
                  <div key={id} className="relative z-0 w-full mb-5">
                    <Field
                      id={id}
                      name={id}
                      type={type}
                      placeholder=" "
                      className={`pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 ${
                        errors[id] && touched[id]
                          ? "border-red-600"
                          : "border-gray-200"
                      }`}
                    />
                    <label
                      htmlFor={id}
                      className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
                    >
                      {label}
                    </label>
                    <ErrorMessage name={id}>
                      {(msg) => (
                        <div className="text-red-600 text-sm mt-1">{msg}</div>
                      )}
                    </ErrorMessage>
                  </div>
                ))}
                <div className="relative z-0 w-full mb-5">
                  <Field
                    as="select"
                    id="market"
                    name="market"
                    className={`pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 ${
                      errors.market && touched.market
                        ? "border-red-600"
                        : "border-gray-200"
                    }`}
                  >
                    <option value="" disabled hidden></option>
                    <option value="stock">Stock</option>
                    <option value="forex">Forex</option>
                    <option value="crypto">Crypto</option>
                  </Field>
                  <label
                    htmlFor="market"
                    className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
                  >
                    Market
                  </label>
                  <ErrorMessage name="market">
                    {(msg) => (
                      <div className="text-red-600 text-sm mt-1">{msg}</div>
                    )}
                  </ErrorMessage>
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 mt-3 text-lg text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 hover:shadow-lg focus:outline-none"
                  disabled={isSubmitting}
                >
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default CreateTrade;
