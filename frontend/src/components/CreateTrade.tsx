import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

interface ICreateTrade {
  riskPercentage?: number;
  costBasis?: number;
  profitLoss?: number;
  symbol: string;
  entryPrice: number;
  exitPrice: number;
  risk: number;
  reward: number;
  tags: string[];
  createdAt: Date;
  stopLossLevel?: number;
  positionSize?: number;
  tradeType: "stock" | "forex" | "crypto" | "option";
  entryDate: Date;
  exitDate: Date;
  quantity?: number;
  optionType?: "call" | "put";
  strikePrice?: number;
  optionPremium?: number;
  units?: number;
  usdExchangeRate?: number;
  leverage?: number;
  positionType?: "long" | "short";
}

const tradeSchema = yup.object().shape({
  symbol: yup
    .string()
    .min(3, "Symbol must be at least 3 characters long")
    .required("Symbol is required"),
  entryPrice: yup.number().required("Entry Price is required"),
  exitPrice: yup.number().required("Exit Price is required"),
  risk: yup.number().required("Risk is required"),
  reward: yup.number().required("Reward is required"),
  tags: yup.string().required("Tags are required"),
  tradeType: yup.string().required("Trade Type is required"),
  entryDate: yup.date().required("Entry Date is required"),
  exitDate: yup.date().required("Exit Date is required"),
  quantity: yup.number().when("tradeType", {
    is: (tradeType: string) => tradeType === "stock" || tradeType === "crypto",
    then: (schema) =>
      schema.required("Quantity is required for stock and crypto"),
  }),
  optionType: yup.string().when("tradeType", {
    is: (tradeType: string) => tradeType === "option",
    then: (schema) => schema.required("Option Type is required for options"),
  }),
  strikePrice: yup.number().when("tradeType", {
    is: (tradeType: string) => tradeType === "option",
    then: (schema) => schema.required("Strike Price is required for options"),
  }),
  optionPremium: yup.number().when("tradeType", {
    is: (tradeType: string) => tradeType === "option",
    then: (schema) => schema.required("Option Premium is required for options"),
  }),
  units: yup.number().when("tradeType", {
    is: (tradeType: string) => tradeType === "forex",
    then: (schema) => schema.required("Units are required for forex"),
  }),
  usdExchangeRate: yup.number().when("tradeType", {
    is: (tradeType: string) => tradeType === "forex",
    then: (schema) =>
      schema.required("USD Exchange Rate is required for forex"),
  }),
  leverage: yup.number().when("tradeType", {
    is: "crypto",
    then: (schema) => schema.required("Leverage is required for crypto trades"),
  }),
  positionType: yup.string().when("tradeType", {
    is: "crypto",
    then: (schema) =>
      schema.required("Position type is required for crypto trades"),
  }),
  riskPercentage: yup
    .number()
    .min(0, "Risk percentage must be at least 0")
    .max(100, "Risk percentage cannot exceed 100")
    .required("Risk percentage is required"),
});

const CreateTrade: React.FC = () => {
  const initialValues: ICreateTrade = {
    symbol: "",
    entryPrice: 0,
    exitPrice: 0,
    risk: 0,
    reward: 0,
    tags: [],
    createdAt: new Date(),
    tradeType: "stock",
    entryDate: new Date(),
    exitDate: new Date(),
  };

  return (
    <section className="my-auto py-10 dark:bg-gray-900">
      <div className="mx-auto max-w-6xl bg-white p-16">
        <Formik
          initialValues={initialValues}
          validationSchema={tradeSchema}
          onSubmit={(values, { resetForm }) => {
            alert(`Trade Created: ${JSON.stringify(values, null, 2)}`);
            resetForm();
          }}
        >
          {({ errors, touched, isSubmitting, values }) => (
            <div className="flex flex-col lg:flex-row">
              <Form className="flex-1 lg:pr-8">
                <div className="mb-6 grid gap-6 lg:grid-cols-2">
                  {[
                    {
                      id: "symbol",
                      label: "Symbol",
                      type: "text",
                      description: "The ticker symbol of the asset.",
                    },
                    {
                      id: "entryPrice",
                      label: "Entry Price",
                      type: "number",
                      description: "The price at which the asset was bought.",
                    },
                    {
                      id: "exitPrice",
                      label: "Exit Price",
                      type: "number",
                      description: "The price at which the asset was sold.",
                    },
                    {
                      id: "risk",
                      label: "Risk",
                      type: "number",
                      description: "The potential loss in the trade.",
                    },
                    {
                      id: "reward",
                      label: "Reward",
                      type: "number",
                      description: "The potential gain in the trade.",
                    },
                    {
                      id: "tags",
                      label: "Tags (comma separated)",
                      type: "text",
                      description: "Keywords associated with the trade.",
                    },
                  ].map(({ id, label, type, description }) => (
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
                          errors[id as keyof ICreateTrade] &&
                          touched[id as keyof ICreateTrade]
                            ? "border-red-600"
                            : ""
                        }`}
                        placeholder={label}
                      />
                      <ErrorMessage name={id}>
                        {(msg) => (
                          <div className="mt-1 text-sm text-red-600">{msg}</div>
                        )}
                      </ErrorMessage>
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        {description}
                      </p>
                    </div>
                  ))}
                  <div>
                    <label
                      htmlFor="tradeType"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Trade Type
                    </label>
                    <Field
                      as="select"
                      id="tradeType"
                      name="tradeType"
                      className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 ${
                        errors.tradeType && touched.tradeType
                          ? "border-red-600"
                          : ""
                      }`}
                    >
                      <option value="stock">Stock</option>
                      <option value="forex">Forex</option>
                      <option value="crypto">Crypto</option>
                      <option value="option">Option</option>
                    </Field>
                    <ErrorMessage name="tradeType">
                      {(msg) => (
                        <div className="mt-1 text-sm text-red-600">{msg}</div>
                      )}
                    </ErrorMessage>
                  </div>
                  <div>
                    <label
                      htmlFor="entryDate"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Entry Date
                    </label>
                    <Field
                      type="date"
                      id="entryDate"
                      name="entryDate"
                      className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 ${
                        errors.entryDate && touched.entryDate
                          ? "border-red-600"
                          : ""
                      }`}
                    />
                    <ErrorMessage name="entryDate">
                      {(msg) => (
                        <div className="mt-1 text-sm text-red-600">{msg}</div>
                      )}
                    </ErrorMessage>
                  </div>
                  <div>
                    <label
                      htmlFor="exitDate"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Exit Date
                    </label>
                    <Field
                      type="date"
                      id="exitDate"
                      name="exitDate"
                      className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 ${
                        errors.exitDate && touched.exitDate
                          ? "border-red-600"
                          : ""
                      }`}
                    />
                    <ErrorMessage name="exitDate">
                      {(msg) => (
                        <div className="mt-1 text-sm text-red-600">{msg}</div>
                      )}
                    </ErrorMessage>
                  </div>
                  {["stock", "crypto"].includes(values.tradeType) && (
                    <div>
                      <label
                        htmlFor="quantity"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Quantity
                      </label>
                      <Field
                        type="number"
                        id="quantity"
                        name="quantity"
                        className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 ${
                          errors.quantity && touched.quantity
                            ? "border-red-600"
                            : ""
                        }`}
                      />
                      <ErrorMessage name="quantity">
                        {(msg) => (
                          <div className="mt-1 text-sm text-red-600">{msg}</div>
                        )}
                      </ErrorMessage>
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        The number of units bought or sold.
                      </p>
                    </div>
                  )}
                  {values.tradeType === "crypto" && (
                    <>
                      <div>
                        <label
                          htmlFor="leverage"
                          className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Leverage
                        </label>
                        <Field
                          type="number"
                          id="leverage"
                          name="leverage"
                          className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 ${
                            errors.leverage && touched.leverage
                              ? "border-red-600"
                              : ""
                          }`}
                        />
                        <ErrorMessage name="leverage">
                          {(msg) => (
                            <div className="mt-1 text-sm text-red-600">
                              {msg}
                            </div>
                          )}
                        </ErrorMessage>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          The leverage used in the trade.
                        </p>
                      </div>
                      <div>
                        <label
                          htmlFor="positionType"
                          className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Position Type
                        </label>
                        <Field
                          as="select"
                          id="positionType"
                          name="positionType"
                          className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 ${
                            errors.positionType && touched.positionType
                              ? "border-red-600"
                              : ""
                          }`}
                        >
                          <option value="long">Long</option>
                          <option value="short">Short</option>
                        </Field>
                        <ErrorMessage name="positionType">
                          {(msg) => (
                            <div className="mt-1 text-sm text-red-600">
                              {msg}
                            </div>
                          )}
                        </ErrorMessage>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          The position type: Long or Short.
                        </p>
                      </div>
                    </>
                  )}
                  {values.tradeType === "option" && (
                    <>
                      <div>
                        <label
                          htmlFor="optionType"
                          className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Option Type
                        </label>
                        <Field
                          as="select"
                          id="optionType"
                          name="optionType"
                          className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 ${
                            errors.optionType && touched.optionType
                              ? "border-red-600"
                              : ""
                          }`}
                        >
                          <option value="call">Call</option>
                          <option value="put">Put</option>
                        </Field>
                        <ErrorMessage name="optionType">
                          {(msg) => (
                            <div className="mt-1 text-sm text-red-600">
                              {msg}
                            </div>
                          )}
                        </ErrorMessage>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          The type of option: Call or Put.
                        </p>
                      </div>
                      <div>
                        <label
                          htmlFor="strikePrice"
                          className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Strike Price
                        </label>
                        <Field
                          type="number"
                          id="strikePrice"
                          name="strikePrice"
                          className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 ${
                            errors.strikePrice && touched.strikePrice
                              ? "border-red-600"
                              : ""
                          }`}
                        />
                        <ErrorMessage name="strikePrice">
                          {(msg) => (
                            <div className="mt-1 text-sm text-red-600">
                              {msg}
                            </div>
                          )}
                        </ErrorMessage>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          The price at which the option can be exercised.
                        </p>
                      </div>
                      <div>
                        <label
                          htmlFor="optionPremium"
                          className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Option Premium
                        </label>
                        <Field
                          type="number"
                          id="optionPremium"
                          name="optionPremium"
                          className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 ${
                            errors.optionPremium && touched.optionPremium
                              ? "border-red-600"
                              : ""
                          }`}
                        />
                        <ErrorMessage name="optionPremium">
                          {(msg) => (
                            <div className="mt-1 text-sm text-red-600">
                              {msg}
                            </div>
                          )}
                        </ErrorMessage>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          The cost of purchasing the option.
                        </p>
                      </div>
                    </>
                  )}
                  {values.tradeType === "forex" && (
                    <>
                      <div>
                        <label
                          htmlFor="units"
                          className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Units
                        </label>
                        <Field
                          type="number"
                          id="units"
                          name="units"
                          className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 ${
                            errors.units && touched.units
                              ? "border-red-600"
                              : ""
                          }`}
                        />
                        <ErrorMessage name="units">
                          {(msg) => (
                            <div className="mt-1 text-sm text-red-600">
                              {msg}
                            </div>
                          )}
                        </ErrorMessage>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          The number of currency units traded.
                        </p>
                      </div>
                      <div>
                        <label
                          htmlFor="usdExchangeRate"
                          className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          USD Exchange Rate
                        </label>
                        <Field
                          type="number"
                          id="usdExchangeRate"
                          name="usdExchangeRate"
                          className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 ${
                            errors.usdExchangeRate && touched.usdExchangeRate
                              ? "border-red-600"
                              : ""
                          }`}
                        />
                        <ErrorMessage name="usdExchangeRate">
                          {(msg) => (
                            <div className="mt-1 text-sm text-red-600">
                              {msg}
                            </div>
                          )}
                        </ErrorMessage>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          The exchange rate for USD conversion.
                        </p>
                      </div>
                    </>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
                  disabled={isSubmitting}
                >
                  Submit
                </button>
              </Form>
              <div className="mt-6 flex-1 lg:ml-6 lg:mt-0">
                <div className="rounded-lg bg-gray-100 p-6 shadow-md dark:bg-gray-800">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Trade Type Details
                  </h3>
                  {values.tradeType === "stock" && (
                    <div>
                      <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                        Stock trades involve buying and selling shares of a
                        company. The quantity represents the number of shares
                        traded.
                      </p>
                      <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                        <strong>Calculation:</strong> Profit/Loss = (Exit Price
                        - Entry Price) * Quantity
                      </p>
                      <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                        This calculation determines the total profit or loss
                        from the trade by multiplying the difference between the
                        exit and entry prices by the number of shares traded.
                      </p>
                    </div>
                  )}

                  {values.tradeType === "crypto" && (
                    <div>
                      <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                        Crypto trades involve buying and selling digital
                        currencies. The quantity represents the amount of
                        cryptocurrency traded.
                      </p>
                      <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                        <strong>Calculation:</strong> Profit/Loss = (Exit Price
                        - Entry Price) * Quantity * Leverage
                      </p>
                      <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                        Leverage amplifies the potential profit or loss by
                        multiplying the base profit/loss with the leverage
                        factor. For short positions, the profit/loss is
                        reversed.
                      </p>
                      <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                        <strong>Position Type:</strong> A long position profits
                        from price increases, while a short position profits
                        from price decreases.
                      </p>
                    </div>
                  )}

                  {values.tradeType === "option" && (
                    <div>
                      <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                        Options are contracts that give the buyer the right, but
                        not the obligation, to buy or sell an asset at a set
                        price on or before a certain date.
                      </p>
                      <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                        <strong>Calculation:</strong> Profit/Loss = (Max(0, Exit
                        Price - Strike Price) - Option Premium) for Call Options
                      </p>
                      <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                        <strong>Calculation:</strong> Profit/Loss = (Max(0,
                        Strike Price - Exit Price) - Option Premium) for Put
                        Options
                      </p>
                      <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                        The profit/loss for options is calculated based on the
                        option type (call or put) and involves the strike price
                        and option premium.
                      </p>
                    </div>
                  )}

                  {values.tradeType === "forex" && (
                    <div>
                      <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                        Forex trades involve exchanging one currency for
                        another. The units represent the amount of currency
                        being traded.
                      </p>
                      <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                        <strong>Calculation:</strong> Profit/Loss = (Exit Price
                        - Entry Price) * Units * USD Exchange Rate
                      </p>
                      <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                        This calculation accounts for the currency exchange
                        rate, multiplying the price difference by the number of
                        units and the USD exchange rate.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default CreateTrade;
