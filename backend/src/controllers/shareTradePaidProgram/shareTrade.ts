// Assuming SubscriptionService is in the same directory level as your controllers
import { Controller, Route, Post, Body, Security, Path, Delete, Put } from "tsoa";
import { SubscriptionService } from '../../services/subscriptionService';

@Route("shareTrade")
export class ShareTradeController extends Controller {
  private subscriptionService = new SubscriptionService("shareTrade");

  @Security("jwt")
  @Post("create-subscription")
  async createSubscription(@Body() request: any) {
    return this.subscriptionService.createSubscription(request.email, request.paymentMethodId, request.priceId);
  }

  @Security("jwt")
  @Delete("cancel-subscription/{subscriptionId}")
  async cancelSubscription(@Path() subscriptionId: string) {
    return this.subscriptionService.cancelSubscription(subscriptionId);
  }

  @Security("jwt")
  @Put("update-subscription/{subscriptionId}")
  async updateSubscription(@Path() subscriptionId: string, @Body() body: { priceId: string }) {
    return this.subscriptionService.updateSubscription(subscriptionId, body.priceId);
  }
}