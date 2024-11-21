import { Database } from "../config/db/database";
import Stripe from "stripe";

export class SubscriptionService {
  private database: Database = new Database();
  private subscriptionCollection = this.database.getCollection("subscriptions");
  private stripe: Stripe;

  constructor(private stripeSecretKey: string) {
    this.stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2023-10-16",
    });
  }

  async createSubscription(
    email: string,
    paymentMethodId: string,
    priceId: string
  ) {
    try {
      const customer = await this.stripe.customers.create({
        email,
        payment_method: paymentMethodId,
        invoice_settings: {
          default_payment_method: paymentMethodId,
        },
      });

      const subscription = await this.stripe.subscriptions.create({
        customer: customer.id,
        items: [{ price: priceId }],
        expand: ["latest_invoice.payment_intent"],
      });

      await this.subscriptionCollection.insertOne({
        email,
        stripeCustomerId: customer.id,
        stripeSubscriptionId: subscription.id,
        priceId,
        status: subscription.status,
        createdAt: new Date(),
      });

      return subscription;
    } catch (error) {
      console.error("Stripe subscription creation failed:", error);
      throw new Error("Subscription creation failed");
    }
  }

  async cancelSubscription(subscriptionId: string) {
    try {
      const canceledSubscription = await this.stripe.subscriptions.cancel(
        subscriptionId
      );

      await this.subscriptionCollection.updateOne(
        { stripeSubscriptionId: subscriptionId },
        { $set: { status: "canceled", canceledAt: new Date() } }
      );

      return canceledSubscription;
    } catch (error) {
      console.error("Stripe subscription cancellation failed:", error);
      throw new Error("Subscription cancellation failed");
    }
  }

  async updateSubscription(subscriptionId: string, priceId: string) {
    try {
      const updatedSubscription = await this.stripe.subscriptions.update(
        subscriptionId,
        {
          items: [{ price: priceId }],
        }
      );

      await this.subscriptionCollection.updateOne(
        { stripeSubscriptionId: subscriptionId },
        { $set: { priceId, updatedAt: new Date() } }
      );

      return updatedSubscription;
    } catch (error) {
      console.error("Stripe subscription update failed:", error);
      throw new Error("Subscription update failed");
    }
  }

  async createOneTimePayment(
    email: string,
    paymentMethodId: string,
    amount: number,
    currency: string = "usd"
  ) {
    try {
      const customer = await this.stripe.customers.create({
        email,
        payment_method: paymentMethodId,
        invoice_settings: {
          default_payment_method: paymentMethodId,
        },
      });

      const paymentIntent = await this.stripe.paymentIntents.create({
        amount,
        currency,
        customer: customer.id,
        payment_method: paymentMethodId,
        off_session: true,
        confirm: true,
      });

      await this.subscriptionCollection.insertOne({
        email,
        stripeCustomerId: customer.id,
        paymentIntentId: paymentIntent.id,
        amount,
        currency,
        status: paymentIntent.status,
        createdAt: new Date(),
      });

      return paymentIntent;
    } catch (error) {
      console.error("Stripe one-time payment creation failed:", error);
      throw new Error("One-time payment creation failed");
    }
  }
}
