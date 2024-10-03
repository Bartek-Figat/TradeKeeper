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
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center h-full w-full m-auto">
      <div className="col-span-5 h-full w-full flex items-center justify-center text-center text-black p-8 z-10">
        <div className="flex justify-center items-center w-3/4 h-3/4">
          <h1 className="text-3xl font-bold leading-tight text-gray-800">
            When it comes to our new business venture, I’m the TradeKeeper. I’ll
            handle setting up all the necessary trades and transactions.
          </h1>
        </div>
      </div>
      <div className="col-span-6 bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Create Trade</h1>
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
                { id: "profitTarget", label: "Profit Target", type: "number" },
                { id: "quantity", label: "Quantity", type: "number" },
                { id: "paidPrice", label: "Paid Price", type: "number" },
                { id: "fee", label: "Fee", type: "number" },
              ].map(({ id, label, type }) => (
                <div key={id} className="relative z-0 w-full mb-6 group">
                  <Field
                    id={id}
                    name={id}
                    type={type}
                    placeholder=" "
                    className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 ${
                      errors[id] && touched[id]
                        ? "border-red-500"
                        : "border-gray-300"
                    } appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                  />
                  <label
                    htmlFor={id}
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    {label}
                  </label>
                  <ErrorMessage name={id}>
                    {(msg) => (
                      <div className="text-red-500 text-sm mt-1">{msg}</div>
                    )}
                  </ErrorMessage>
                </div>
              ))}
              <div className="relative z-0 w-full mb-6 group">
                <Field
                  as="select"
                  id="market"
                  name="market"
                  className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 ${
                    errors.market && touched.market
                      ? "border-red-500"
                      : "border-gray-300"
                  } appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                >
                  <option value="">Select Market</option>
                  <option value="stock">Stock</option>
                  <option value="forex">Forex</option>
                  <option value="crypto">Crypto</option>
                </Field>
                <label
                  htmlFor="market"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Market
                </label>
                <ErrorMessage name="market">
                  {(msg) => (
                    <div className="text-red-500 text-sm mt-1">{msg}</div>
                  )}
                </ErrorMessage>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                disabled={isSubmitting}
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <div className="col-span-1"></div>
    </div>
  );
};

export default CreateTrade;