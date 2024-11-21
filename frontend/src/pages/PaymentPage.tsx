import React, { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";

const stripePromise = loadStripe("your-publishable-key-here");

const PaymentPage: React.FC = () => {
  const [stripe, setStripe] = useState<Stripe | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeStripe = async () => {
      try {
        const stripeInstance = await stripePromise;
        setStripe(stripeInstance);
      } catch (err) {
        setError("Failed to load Stripe. Please try again later.");
      }
    };

    initializeStripe();
  }, []);

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!stripe) {
    return <div className="text-center">Loading payment options...</div>;
  }

  return (
    <div className="mx-auto max-w-lg p-5">
      <h2 className="mb-4 text-center text-2xl font-semibold">Payment Page</h2>
      <Elements stripe={stripe}>
        <PaymentForm />
      </Elements>
    </div>
  );
};

export default PaymentPage;
