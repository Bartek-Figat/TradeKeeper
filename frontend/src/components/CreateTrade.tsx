import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

const tradeSchema = yup.object().shape({
  tradeSymbol: yup
    .string()
    .min(1, "Trade Symbol must be at least 3 characters long")
    .required("Trade Symbol is required"),
  limitPrice: yup.number().required("Limit Price is required"),
  profitTarget: yup.number().required("Profi Target  is required"),
  quantity: yup.number().required("Quantity  is required"),
  paidPrice: yup.number().required("Paid Price  is required"),
  fee: yup.number().required("Fee  is required"),
  market: yup.string().required("Market  is required"),
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
    market: "", // Default market value
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
      <div className="m-auto w-full md:w-[40rem] p-4 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Create Trade</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={tradeSchema}
          onSubmit={(
            {
              tradeSymbol,
              limitPrice,
              profitTarget,
              quantity,
              paidPrice,
              fee,
              market,
            }: MyFormValues,
            { resetForm }
          ) => {
            console.log();
            alert(
              `${tradeSymbol}, ${limitPrice}, ${profitTarget}, ${quantity}, ${paidPrice}, ${fee}, ${market}`
            );
            resetForm();
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="space-y-4">
              <label htmlFor="tradeSymbol" className="block">
                Trade Symbol
              </label>
              <Field
                id="tradeSymbol"
                name="tradeSymbol"
                type="text"
                placeholder="Trade Symbol"
                className="w-full rounded border border-gray-300 bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-800"
                style={{
                  borderColor:
                    errors.tradeSymbol && touched.tradeSymbol ? "red" : null,
                }}
              />
              <ErrorMessage name="tradeSymbol">
                {(msg) => (
                  <div className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {msg}
                  </div>
                )}
              </ErrorMessage>
              <label htmlFor="limitPrice" className="block">
                Limit Price
              </label>
              <Field
                id="limitPrice"
                name="limitPrice"
                type="number"
                placeholder="Limit Price"
                className="w-full rounded border border-gray-300 bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-800"
                style={{
                  borderColor:
                    errors.limitPrice && touched.limitPrice ? "red" : null,
                }}
              />
              <ErrorMessage name="limitPrice">
                {(msg) => (
                  <div className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {msg}
                  </div>
                )}
              </ErrorMessage>
              <label htmlFor="profitTarget" className="block">
                Profit Target
              </label>
              <Field
                id="profitTarget"
                name="profitTarget"
                type="number"
                placeholder="Profit Target"
                className="w-full rounded border border-gray-300 bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-800"
                style={{
                  borderColor:
                    errors.profitTarget && touched.profitTarget ? "red" : null,
                }}
              />
              <ErrorMessage name="profitTarget">
                {(msg) => (
                  <div className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {msg}
                  </div>
                )}
              </ErrorMessage>
              <label htmlFor="quantity" className="block">
                Quantity
              </label>
              <Field
                id="quantity"
                name="quantity"
                type="number"
                placeholder="Quantity"
                className="w-full rounded border border-gray-300 bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-800"
                style={{
                  borderColor:
                    errors.quantity && touched.quantity ? "red" : null,
                }}
              />
              <ErrorMessage name="quantity">
                {(msg) => (
                  <div className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {msg}
                  </div>
                )}
              </ErrorMessage>
              <label htmlFor="paidPrice" className="block">
                Paid Price
              </label>
              <Field
                id="paidPrice"
                name="paidPrice"
                type="number"
                placeholder="Paid Price"
                className="w-full rounded border border-gray-300 bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-800"
                style={{
                  borderColor:
                    errors.paidPrice && touched.paidPrice ? "red" : null,
                }}
              />
              <ErrorMessage name="paidPrice">
                {(msg) => (
                  <div className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {msg}
                  </div>
                )}
              </ErrorMessage>
              <label htmlFor="fee" className="block">
                Fee
              </label>
              <Field
                id="fee"
                name="fee"
                type="number"
                placeholder="Fee"
                className="w-full rounded border border-gray-300 bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-800"
                style={{
                  borderColor: errors.fee && touched.fee ? "red" : null,
                }}
              />
              <ErrorMessage name="fee">
                {(msg) => (
                  <div className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {msg}
                  </div>
                )}
              </ErrorMessage>
              <label htmlFor="market" className="block">
                Market
              </label>
              <Field
                as="select"
                id="market"
                name="market"
                className="w-full rounded border border-gray-300 bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-800"
                style={{
                  borderColor: errors.market && touched.market ? "red" : null,
                }}
              >
                <option value="">Select Market</option>
                <option value="stock">Stock</option>
                <option value="forex">Forex</option>
                <option value="crypto">Crypto</option>
              </Field>
              <ErrorMessage name="market">
                {(msg) => (
                  <div className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {msg}
                  </div>
                )}
              </ErrorMessage>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                disabled={isSubmitting}
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateTrade;
