import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCreateTradeMutation } from "../services/tradeApi";
import { ICreateTrade } from "../services/type";
import { useSelector } from "react-redux";

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
    is: (tradeType: string) =>
      tradeType === "stock" ||
      tradeType === "crypto" ||
      tradeType === "crypto spot",
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
  fees: yup
    .number()
    .min(0, "Fees must be at least 0")
    .required("Fees are required"), // Validation for fees
});

const CreateTrade: React.FC = () => {
  const [createTrade, { isLoading }] = useCreateTradeMutation();
  const darkMode = useSelector(
    (state: { darkMode: boolean }) => state.darkMode,
  );

  const initialValues: ICreateTrade = {
    symbol: "",
    entryPrice: 0,
    exitPrice: 0,
    risk: 0,
    createdAt: new Date().toISOString(),
    reward: 0,
    tags: [],
    tradeType: "stock",
    entryDate: new Date().toISOString(),
    exitDate: new Date().toISOString(),
    quantity: 0,
    optionType: "",
    strikePrice: 0,
    optionPremium: 0,
    units: 0,
    usdExchangeRate: 0,
    leverage: 0,
    positionType: undefined,
    riskPercentage: 0,
    fees: 0,
    _id: "",
    profitLoss: 0,
    tradeOutcome: "",
    winRate: 0,
    avgProfitLoss: 0,
    riskRewardRatio: 0,
    maxDrawdown: 0,
    sharpeRatio: 0,
    profitFactor: 0,
    volatility: 0,
    sortinoRatio: 0,
    avgHoldingPeriod: 0,
    improvementSuggestions: [],
  };

  return (
    <section className={`rounded-md p-16 ${darkMode} ? "dark" : ""`}>
      <div
        className={`container mx-auto p-10 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}
      >
        <ToastContainer />
        <Formik
          initialValues={initialValues}
          validationSchema={tradeSchema}
          onSubmit={async (values, { resetForm }) => {
            try {
              await createTrade(values).unwrap();
              toast.success("Trade Created Successfully");
              resetForm();
            } catch (err) {
              console.error("Failed to create trade:", err);
              toast.error("Failed to create trade");
              resetForm();
            }
          }}
        >
          {({ errors, touched, values }) => (
            <div className="flex flex-col lg:flex-row">
              <Form className="flex-1 lg:pr-12">
                <div className="mb-6 grid gap-6 lg:grid-cols-2">
                  {/* Common Fields */}
                  {[
                    {
                      id: "symbol",
                      label: "Symbol",
                      type: "text",
                      description: "The ticker symbol of the asset.",
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
                        className={`mb-2 block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-900"}`}
                      >
                        {label}
                      </label>
                      <Field
                        id={id}
                        name={id}
                        type={type}
                        className={`block w-full rounded-lg border ${darkMode ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400" : "border-gray-300 bg-gray-50 text-gray-900"} p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 ${
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
                      <p
                        className={`mt-1 text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                      >
                        {description}
                      </p>
                    </div>
                  ))}

                  {/* Trade Type Field */}
                  <div>
                    <label
                      htmlFor="tradeType"
                      className={`mb-2 block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-900"}`}
                    >
                      Trade Type
                    </label>
                    <Field
                      as="select"
                      id="tradeType"
                      name="tradeType"
                      className={`block w-full rounded-lg border ${darkMode ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400" : "border-gray-300 bg-gray-50 text-gray-900"} p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 ${
                        errors.tradeType && touched.tradeType
                          ? "border-red-600"
                          : ""
                      }`}
                    >
                      <option value="stock">Stock</option>
                      <option value="forex">Forex</option>
                      <option value="crypto">Crypto</option>
                      <option value="crypto spot">Crypto Spot</option>
                      <option value="option">Option</option>
                    </Field>
                    <ErrorMessage name="tradeType">
                      {(msg) => (
                        <div className="mt-1 text-sm text-red-600">{msg}</div>
                      )}
                    </ErrorMessage>
                  </div>

                  {/* Conditional Fields */}
                  {values.tradeType !== "option" && (
                    <div>
                      <label
                        htmlFor="entryPrice"
                        className={`mb-2 block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-900"}`}
                      >
                        Entry Price
                      </label>
                      <Field
                        type="number"
                        id="entryPrice"
                        name="entryPrice"
                        className={`block w-full rounded-lg border ${darkMode ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400" : "border-gray-300 bg-gray-50 text-gray-900"} p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 ${
                          errors.entryPrice && touched.entryPrice
                            ? "border-red-600"
                            : ""
                        }`}
                      />
                      <ErrorMessage name="entryPrice">
                        {(msg) => (
                          <div className="mt-1 text-sm text-red-600">{msg}</div>
                        )}
                      </ErrorMessage>
                      <p
                        className={`mt-1 text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                      >
                        The price at which the asset was bought.
                      </p>
                    </div>
                  )}

                  {["stock", "crypto", "crypto spot"].includes(
                    values.tradeType,
                  ) && (
                    <div>
                      <label
                        htmlFor="quantity"
                        className={`mb-2 block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-900"}`}
                      >
                        Quantity
                      </label>
                      <Field
                        type="number"
                        id="quantity"
                        name="quantity"
                        className={`block w-full rounded-lg border ${darkMode ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400" : "border-gray-300 bg-gray-50 text-gray-900"} p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 ${
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
                      <p
                        className={`mt-1 text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                      >
                        The number of units bought or sold.
                      </p>
                    </div>
                  )}

                  {values.tradeType === "crypto" && (
                    <>
                      <div>
                        <label
                          htmlFor="leverage"
                          className={`mb-2 block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-900"}`}
                        >
                          Leverage
                        </label>
                        <Field
                          type="number"
                          id="leverage"
                          name="leverage"
                          className={`block w-full rounded-lg border ${darkMode ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400" : "border-gray-300 bg-gray-50 text-gray-900"} p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 ${
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
                        <p
                          className={`mt-1 text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                        >
                          The leverage used in the trade.
                        </p>
                      </div>
                      <div>
                        <label
                          htmlFor="positionType"
                          className={`mb-2 block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-900"}`}
                        >
                          Position Type
                        </label>
                        <Field
                          as="select"
                          id="positionType"
                          name="positionType"
                          className={`block w-full rounded-lg border ${darkMode ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400" : "border-gray-300 bg-gray-50 text-gray-900"} p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 ${
                            errors.positionType && touched.positionType
                              ? "border-red-600"
                              : ""
                          }`}
                        >
                          <option value="long">Long</option>
                          <option value="short">Short</option>
                          <option value="spot">Spot</option>
                        </Field>
                        <ErrorMessage name="positionType">
                          {(msg) => (
                            <div className="mt-1 text-sm text-red-600">
                              {msg}
                            </div>
                          )}
                        </ErrorMessage>
                        <p
                          className={`mt-1 text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                        >
                          The position type: Long, Short, or Spot.
                        </p>
                      </div>
                    </>
                  )}

                  {values.tradeType === "option" && (
                    <>
                      <div>
                        <label
                          htmlFor="optionType"
                          className={`mb-2 block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-900"}`}
                        >
                          Option Type
                        </label>
                        <Field
                          as="select"
                          id="optionType"
                          name="optionType"
                          className={`block w-full rounded-lg border ${darkMode ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400" : "border-gray-300 bg-gray-50 text-gray-900"} p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 ${
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
                        <p
                          className={`mt-1 text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                        >
                          The type of option: Call or Put.
                        </p>
                      </div>
                      <div>
                        <label
                          htmlFor="strikePrice"
                          className={`mb-2 block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-900"}`}
                        >
                          Strike Price
                        </label>
                        <Field
                          type="number"
                          id="strikePrice"
                          name="strikePrice"
                          className={`block w-full rounded-lg border ${darkMode ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400" : "border-gray-300 bg-gray-50 text-gray-900"} p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 ${
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
                        <p
                          className={`mt-1 text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                        >
                          The price at which the option can be exercised.
                        </p>
                      </div>
                      <div>
                        <label
                          htmlFor="optionPremium"
                          className={`mb-2 block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-900"}`}
                        >
                          Option Premium
                        </label>
                        <Field
                          type="number"
                          id="optionPremium"
                          name="optionPremium"
                          className={`block w-full rounded-lg border ${darkMode ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400" : "border-gray-300 bg-gray-50 text-gray-900"} p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 ${
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
                        <p
                          className={`mt-1 text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                        >
                          The cost of purchasing the option.
                        </p>
                      </div>
                      <div>
                        <label
                          htmlFor="quantity"
                          className={`mb-2 block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-900"}`}
                        >
                          Quantity
                        </label>
                        <Field
                          type="number"
                          id="quantity"
                          name="quantity"
                          className={`block w-full rounded-lg border ${darkMode ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400" : "border-gray-300 bg-gray-50 text-gray-900"} p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 ${
                            errors.quantity && touched.quantity
                              ? "border-red-600"
                              : ""
                          }`}
                        />
                        <ErrorMessage name="quantity">
                          {(msg) => (
                            <div className="mt-1 text-sm text-red-600">
                              {msg}
                            </div>
                          )}
                        </ErrorMessage>
                        <p
                          className={`mt-1 text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                        >
                          The number of option contracts.
                        </p>
                      </div>
                    </>
                  )}

                  {values.tradeType === "forex" && (
                    <>
                      <div>
                        <label
                          htmlFor="units"
                          className={`mb-2 block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-900"}`}
                        >
                          Units
                        </label>
                        <Field
                          type="number"
                          id="units"
                          name="units"
                          className={`block w-full rounded-lg border ${darkMode ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400" : "border-gray-300 bg-gray-50 text-gray-900"} p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 ${
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
                        <p
                          className={`mt-1 text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                        >
                          The number of currency units traded.
                        </p>
                      </div>
                      <div>
                        <label
                          htmlFor="usdExchangeRate"
                          className={`mb-2 block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-900"}`}
                        >
                          USD Exchange Rate
                        </label>
                        <Field
                          type="number"
                          id="usdExchangeRate"
                          name="usdExchangeRate"
                          className={`block w-full rounded-lg border ${darkMode ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400" : "border-gray-300 bg-gray-50 text-gray-900"} p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 ${
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
                        <p
                          className={`mt-1 text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                        >
                          The exchange rate for USD conversion.
                        </p>
                      </div>
                    </>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full rounded-lg ${darkMode ? "bg-blue-600 hover:bg-blue-700 focus:ring-blue-800" : "bg-blue-700 hover:bg-blue-800 focus:ring-blue-300"} px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 sm:w-auto`}
                >
                  {isLoading ? "Creating..." : "Create Trade"}
                </button>
              </Form>
              <div className="mt-6 flex-1 lg:ml-12 lg:mt-0">
                <div
                  className={`rounded-lg p-6 shadow-lg ${darkMode ? "bg-gray-800 text-gray-300" : "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-900"}`}
                >
                  <h3
                    className={`text-2xl font-bold ${darkMode ? "text-white" : "text-blue-900"}`}
                  >
                    Trade Details
                  </h3>
                  {values.tradeType && (
                    <div
                      className={`mt-6 rounded-lg p-6 shadow-md ${darkMode ? "bg-gray-800 text-gray-300" : "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800"}`}
                    >
                      <h3
                        className={`text-xl font-semibold ${darkMode ? "text-white" : "text-blue-800"}`}
                      >
                        Sample Transactions
                      </h3>
                      {values.tradeType === "stock" && (
                        <div>
                          <p
                            className={`mt-2 text-base ${darkMode ? "text-gray-300" : "text-gray-800"}`}
                          >
                            <strong>Stock Example:</strong> Buy 100 shares of
                            XYZ at $50, sell at $55. Profit/Loss = (55 - 50) *
                            100 = $500.
                          </p>
                        </div>
                      )}
                      {values.tradeType === "forex" && (
                        <div>
                          <p
                            className={`mt-2 text-base ${darkMode ? "text-gray-300" : "text-gray-800"}`}
                          >
                            <strong>Forex Example:</strong> Buy 10,000 units of
                            EUR/USD at 1.10, sell at 1.15. Profit/Loss = (1.15 -
                            1.10) * 10,000 = $500.
                          </p>
                        </div>
                      )}
                      {values.tradeType === "crypto" && (
                        <div>
                          <p
                            className={`mt-2 text-base ${darkMode ? "text-gray-300" : "text-gray-800"}`}
                          >
                            <strong>Crypto Example:</strong> Buy 2 BTC at
                            $30,000, sell at $35,000 with 2x leverage.
                            Profit/Loss = (35,000 - 30,000) * 2 * 2 = $20,000.
                          </p>
                        </div>
                      )}
                      {values.tradeType === "crypto spot" && (
                        <div>
                          <p
                            className={`mt-2 text-base ${darkMode ? "text-gray-300" : "text-gray-800"}`}
                          >
                            <strong>Crypto Spot Example:</strong> Buy 2 BTC at
                            $30,000, sell at $35,000. Profit/Loss = (35,000 -
                            30,000) * 2 = $10,000.
                          </p>
                        </div>
                      )}
                      {values.tradeType === "option" && (
                        <div>
                          <p
                            className={`mt-2 text-base ${darkMode ? "text-gray-300" : "text-gray-800"}`}
                          >
                            <strong>Option Example:</strong> Buy a call option
                            for 100 shares of XYZ with a strike price of $50 and
                            a premium of $2. If the stock price rises to $55,
                            Profit/Loss = (55 - 50 - 2) * 100 = $300.
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                  {values.tradeType === "stock" && (
                    <div>
                      <p
                        className={`mt-2 text-base ${darkMode ? "text-gray-300" : "text-gray-800"}`}
                      >
                        Stock trades involve buying and selling shares of a
                        company. The quantity represents the number of shares
                        traded.
                      </p>
                      <p
                        className={`mt-2 text-base ${darkMode ? "text-gray-300" : "text-gray-800"}`}
                      >
                        <strong>Calculation:</strong> Profit/Loss = (Exit Price
                        - Entry Price) * Quantity
                      </p>
                      <p
                        className={`mt-2 text-base ${darkMode ? "text-gray-300" : "text-gray-800"}`}
                      >
                        This calculation determines the total profit or loss
                        from the trade by multiplying the difference between the
                        exit and entry prices by the number of shares traded.
                      </p>
                    </div>
                  )}

                  {values.tradeType === "crypto" && (
                    <div>
                      <p
                        className={`mt-2 text-base ${darkMode ? "text-gray-300" : "text-gray-800"}`}
                      >
                        Crypto trades involve buying and selling digital
                        currencies. The quantity represents the amount of
                        cryptocurrency traded.
                      </p>
                      <p
                        className={`mt-2 text-base ${darkMode ? "text-gray-300" : "text-gray-800"}`}
                      >
                        <strong>Calculation:</strong> Profit/Loss = (Exit Price
                        - Entry Price) * Quantity * Leverage
                      </p>
                      <p
                        className={`mt-2 text-base ${darkMode ? "text-gray-300" : "text-gray-800"}`}
                      >
                        Leverage amplifies the potential profit or loss by
                        multiplying the base profit/loss with the leverage
                        factor. For short positions, the profit/loss is
                        reversed.
                      </p>
                      <p
                        className={`mt-2 text-base ${darkMode ? "text-gray-300" : "text-gray-800"}`}
                      >
                        <strong>Position Type:</strong> A long position profits
                        from price increases, while a short position profits
                        from price decreases.
                      </p>
                      <p
                        className={`mt-2 text-base ${darkMode ? "text-gray-300" : "text-gray-800"}`}
                      >
                        <strong>Spot Position Calculation:</strong> If leverage
                        is not defined, it assumes a spot position and
                        calculates the profit/loss as (Exit Price - Entry Price)
                        * Quantity. This is the standard calculation for spot
                        trades where no leverage is involved.
                      </p>
                    </div>
                  )}

                  {values.tradeType === "crypto spot" && (
                    <div>
                      <p
                        className={`mt-2 text-base ${darkMode ? "text-gray-300" : "text-gray-800"}`}
                      >
                        Crypto spot trades involve buying and selling digital
                        currencies without leverage. The quantity represents the
                        amount of cryptocurrency traded.
                      </p>
                      <p
                        className={`mt-2 text-base ${darkMode ? "text-gray-300" : "text-gray-800"}`}
                      >
                        <strong>Calculation:</strong> Profit/Loss = (Exit Price
                        - Entry Price) * Quantity
                      </p>
                      <p
                        className={`mt-2 text-base ${darkMode ? "text-gray-300" : "text-gray-800"}`}
                      >
                        This calculation determines the total profit or loss
                        from the trade by multiplying the difference between the
                        exit and entry prices by the amount of cryptocurrency
                        traded.
                      </p>
                    </div>
                  )}

                  {values.tradeType === "option" && (
                    <div>
                      <p
                        className={`mt-2 text-base ${darkMode ? "text-gray-300" : "text-gray-800"}`}
                      >
                        Options are contracts that give the buyer the right, but
                        not the obligation, to buy or sell an asset at a set
                        price on or before a certain date.
                      </p>
                      <p
                        className={`mt-2 text-base ${darkMode ? "text-gray-300" : "text-gray-800"}`}
                      >
                        <strong>Required Fields for Calculation:</strong>
                      </p>
                      <ul
                        className={`list-disc pl-5 ${darkMode ? "text-gray-300" : "text-gray-800"}`}
                      >
                        <li>
                          <strong>Option Type:</strong> Determines if the option
                          is a "call" or "put".
                        </li>
                        <li>
                          <strong>Strike Price:</strong> The price at which the
                          option can be exercised.
                        </li>
                        <li>
                          <strong>Option Premium:</strong> The cost of
                          purchasing the option.
                        </li>
                        <li>
                          <strong>Quantity:</strong> The number of option
                          contracts.
                        </li>
                        <li>
                          <strong>Exit Price:</strong> The price at which the
                          option is sold or the stock price at expiration.
                        </li>
                      </ul>
                      <p
                        className={`mt-2 text-base ${darkMode ? "text-gray-300" : "text-gray-800"}`}
                      >
                        <strong>Calculation:</strong> For Call Options:
                        Profit/Loss = (Max(0, Exit Price - Strike Price) -
                        Option Premium) * Quantity.
                      </p>
                      <p
                        className={`mt-2 text-base ${darkMode ? "text-gray-300" : "text-gray-800"}`}
                      >
                        <strong>Calculation:</strong> For Put Options:
                        Profit/Loss = (Max(0, Strike Price - Exit Price) -
                        Option Premium) * Quantity.
                      </p>
                      <p
                        className={`mt-2 text-base ${darkMode ? "text-gray-300" : "text-gray-800"}`}
                      >
                        The profit/loss for options is calculated based on the
                        option type (call or put) and involves the strike price,
                        option premium, and quantity.
                      </p>
                    </div>
                  )}

                  {values.tradeType === "forex" && (
                    <div>
                      <p
                        className={`mt-2 text-base ${darkMode ? "text-gray-300" : "text-gray-800"}`}
                      >
                        Forex trades involve exchanging one currency for
                        another. The units represent the amount of currency
                        being traded.
                      </p>
                      <p
                        className={`mt-2 text-base ${darkMode ? "text-gray-300" : "text-gray-800"}`}
                      >
                        <strong>Calculation:</strong> Profit/Loss = (Exit Price
                        - Entry Price) * Units * USD Exchange Rate
                      </p>
                      <p
                        className={`mt-2 text-base ${darkMode ? "text-gray-300" : "text-gray-800"}`}
                      >
                        This calculation accounts for the currency exchange
                        rate, multiplying the price difference by the number of
                        units and the USD exchange rate.
                      </p>
                    </div>
                  )}
                </div>
                <div
                  className={`mt-6 rounded-lg p-6 shadow-md ${darkMode ? "bg-gray-900 text-white" : "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-900"}`}
                >
                  <h3
                    className={`text-2xl font-bold ${darkMode ? "text-white" : "text-blue-900"}`}
                  >
                    Input Explanation
                  </h3>
                  <p
                    className={`mt-2 text-base ${darkMode ? "text-gray-300" : "text-gray-800"}`}
                  >
                    <strong>Symbol:</strong> Identifies the asset being traded.
                    Affects the market data used for calculations.
                  </p>
                  <p
                    className={`mt-2 text-base ${darkMode ? "text-gray-300" : "text-gray-800"}`}
                  >
                    <strong>Entry Price:</strong> The price at which the trade
                    is entered. Affects the calculation of profit/loss.
                  </p>
                  <p
                    className={`mt-2 text-base ${darkMode ? "text-gray-300" : "text-gray-800"}`}
                  >
                    <strong>Exit Price:</strong> The price at which the trade is
                    exited. Affects the calculation of profit/loss.
                  </p>
                  <p
                    className={`mt-2 text-base ${darkMode ? "text-gray-300" : "text-gray-800"}`}
                  >
                    <strong>Risk:</strong> The potential loss in the trade.
                    Helps in determining the risk/reward ratio.
                  </p>
                  <p
                    className={`mt-2 text-base ${darkMode ? "text-gray-300" : "text-gray-800"}`}
                  >
                    <strong>Reward:</strong> The potential gain in the trade.
                    Helps in determining the risk/reward ratio.
                  </p>
                  <p
                    className={`mt-2 text-base ${darkMode ? "text-gray-300" : "text-gray-800"}`}
                  >
                    <strong>Tags:</strong> Keywords associated with the trade.
                    Useful for categorizing and filtering trades.
                  </p>
                  <p
                    className={`mt-2 text-base ${darkMode ? "text-gray-300" : "text-gray-800"}`}
                  >
                    <strong>Trade Type:</strong> Determines the type of trade
                    (stock, forex, crypto, option, crypto spot) and affects the
                    applicable calculations.
                  </p>
                  <p
                    className={`mt-2 text-base ${darkMode ? "text-gray-300" : "text-gray-800"}`}
                  >
                    <strong>Entry Date:</strong> The date the trade was entered.
                    Useful for tracking and analyzing trade duration.
                  </p>
                  <p
                    className={`mt-2 text-base ${darkMode ? "text-gray-300" : "text-gray-800"}`}
                  >
                    <strong>Exit Date:</strong> The date the trade was exited.
                    Useful for tracking and analyzing trade duration.
                  </p>
                  <p
                    className={`mt-2 text-base ${darkMode ? "text-gray-300" : "text-gray-800"}`}
                  >
                    <strong>Quantity:</strong> The number of units traded.
                    Affects the calculation of profit/loss.
                  </p>
                  <p
                    className={`mt-2 text-base ${darkMode ? "text-gray-300" : "text-gray-800"}`}
                  >
                    <strong>Leverage:</strong> Used in crypto trades to amplify
                    potential profit/loss.
                  </p>
                  <p
                    className={`mt-2 text-base ${darkMode ? "text-gray-300" : "text-gray-800"}`}
                  >
                    <strong>Position Type:</strong> Indicates if the position is
                    long, short, or spot, affecting profit/loss calculations.
                  </p>
                  <p
                    className={`mt-2 text-base ${darkMode ? "text-gray-300" : "text-gray-800"}`}
                  >
                    <strong>Option Type:</strong> Determines if the option is a
                    call or put, affecting profit/loss calculations.
                  </p>
                  <p
                    className={`mt-2 text-base ${darkMode ? "text-gray-300" : "text-gray-800"}`}
                  >
                    <strong>Strike Price:</strong> The price at which the option
                    can be exercised. Affects option profit/loss calculations.
                  </p>
                  <p
                    className={`mt-2 text-base ${darkMode ? "text-gray-300" : "text-gray-800"}`}
                  >
                    <strong>Option Premium:</strong> The cost of purchasing the
                    option. Affects option profit/loss calculations.
                  </p>
                  <p
                    className={`mt-2 text-base ${darkMode ? "text-gray-300" : "text-gray-800"}`}
                  >
                    <strong>Units:</strong> The number of currency units traded
                    in forex. Affects profit/loss calculations.
                  </p>
                  <p
                    className={`mt-2 text-base ${darkMode ? "text-gray-300" : "text-gray-800"}`}
                  >
                    <strong>USD Exchange Rate:</strong> Used in forex trades to
                    convert profit/loss to USD.
                  </p>
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
