"use strict";
// // backend/src/services/subscriptionService.ts
// import { Database } from "../config/db/database";
// import Stripe from "stripe";
// export class SubscriptionService {
//   private database: Database = new Database();
//   private subscriptionCollection = this.database.getCollection("subscriptions");
//   private stripe: Stripe;
//   constructor(private stripeSecretKey: string) {
//     this.stripe = new Stripe(stripeSecretKey, {
//       apiVersion: "2020-08-27",
//     });
//   }
//   async createSubscription(
//     email: string,
//     paymentMethodId: string,
//     priceId: string
//   ) {
//     try {
//       const customer = await this.stripe.customers.create({
//         email,
//         payment_method: paymentMethodId,
//         invoice_settings: {
//           default_payment_method: paymentMethodId,
//         },
//       });
//       const subscription = await this.stripe.subscriptions.create({
//         customer: customer.id,
//         items: [{ price: priceId }],
//         expand: ["latest_invoice.payment_intent"],
//       });
//       // Save subscription details to the database
//       await this.subscriptionCollection.insertOne({
//         email,
//         stripeCustomerId: customer.id,
//         stripeSubscriptionId: subscription.id,
//         priceId,
//         status: subscription.status,
//         createdAt: new Date(),
//       });
//       return subscription;
//     } catch (error) {
//       console.error("Stripe subscription creation failed:", error);
//       throw new Error("Subscription creation failed");
//     }
//   }
//   async cancelSubscription(subscriptionId: string) {
//     try {
//       const canceledSubscription = await this.stripe.subscriptionItems.del(
//         subscriptionId
//       );
//       // Update subscription status in the database
//       await this.subscriptionCollection.updateOne(
//         { stripeSubscriptionId: subscriptionId },
//         { $set: { status: "canceled", canceledAt: new Date() } }
//       );
//       return canceledSubscription;
//     } catch (error) {
//       console.error("Stripe subscription cancellation failed:", error);
//       throw new Error("Subscription cancellation failed");
//     }
//   }
//   async updateSubscription(subscriptionId: string, priceId: string) {
//     try {
//       const updatedSubscription = await this.stripe.subscriptions.update(
//         subscriptionId,
//         {
//           items: [
//             {
//               price: priceId,
//             },
//           ],
//         }
//       );
//       // Update subscription details in the database
//       await this.subscriptionCollection.updateOne(
//         { stripeSubscriptionId: subscriptionId },
//         { $set: { priceId, updatedAt: new Date() } }
//       );
//       return updatedSubscription;
//     } catch (error) {
//       console.error("Stripe subscription update failed:", error);
//       throw new Error("Subscription update failed");
//     }
//   }
// }
