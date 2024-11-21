import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import {
  useCreateSubscriptionMutation,
  useCreateOneTimePaymentMutation,
} from "../services/subscriptionApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PaymentForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [createSubscription, { isLoading: isSubscribing }] =
    useCreateSubscriptionMutation();
  const [createOneTimePayment, { isLoading: isPaying }] =
    useCreateOneTimePaymentMutation();

  const [email, setEmail] = useState("");
  const [priceId, setPriceId] = useState("");
  const [amount, setAmount] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubscription = async () => {
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement!,
    });

    if (error) {
      setErrorMessage(error.message || "An error occurred");
      toast.error(error.message || "An error occurred");
      return;
    }

    if (paymentMethod) {
      try {
        await createSubscription({
          email,
          paymentMethodId: paymentMethod.id,
          priceId,
        }).unwrap();
        setErrorMessage("");
        toast.success("Subscription created successfully!");
      } catch (error) {
        setErrorMessage("Subscription creation failed");
        toast.error("Subscription creation failed");
      }
    }
  };

  const handleOneTimePayment = async () => {
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement!,
    });

    if (error) {
      setErrorMessage(error.message || "An error occurred");
      toast.error(error.message || "An error occurred");
      return;
    }

    if (paymentMethod) {
      try {
        await createOneTimePayment({
          email,
          paymentMethodId: paymentMethod.id,
          amount,
        }).unwrap();
        setErrorMessage("");
        toast.success("Payment processed successfully!");
      } catch (error) {
        setErrorMessage("One-time payment failed");
        toast.error("One-time payment failed");
      }
    }
  };

  return (
    <form>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <select
        value={priceId}
        onChange={(e) => setPriceId(e.target.value)}
        required
      >
        <option value="">Select Subscription Price</option>
        <option value="price_5">5 USD</option>
        <option value="price_10">10 USD</option>
        <option value="price_15">15 USD</option>
      </select>
      <input
        type="number"
        placeholder="Amount (in cents)"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        required
      />
      <CardElement />
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
      <button
        type="button"
        onClick={handleSubscription}
        disabled={isSubscribing}
      >
        {isSubscribing ? "Subscribing..." : "Subscribe"}
      </button>
      <button type="button" onClick={handleOneTimePayment} disabled={isPaying}>
        {isPaying ? "Processing..." : `Pay $${(amount / 100).toFixed(2)}`}
      </button>
      <ToastContainer />
    </form>
  );
};

export default PaymentForm;
