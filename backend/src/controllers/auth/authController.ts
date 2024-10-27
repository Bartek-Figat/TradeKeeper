import {
  Controller,
  Route,
  Post,
  Body,
  Middlewares,
  Security,
  Get,
  Request,
  Path,
  Tags,
} from "tsoa";
import rateLimit from "express-rate-limit";
import { AuthService } from "../../services/authService/authService";
import { validateIncomingFields } from "../../middlewares/middleware";

@Route("auth")
@Tags("Auth")
export class CustomAuthController extends Controller {
  private authService = new AuthService();

  // Rate limiter for login and registration
  private static rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 requests per windowMs
    message: "Too many requests, please try again later.",
  });

  @Post("register")
  @Middlewares([validateIncomingFields, CustomAuthController.rateLimiter])
  async registration(@Body() req: any): Promise<void> {
    return this.authService.registration(req);
  }

  @Post("login")
  @Middlewares([validateIncomingFields, CustomAuthController.rateLimiter])
  async login(@Body() req: any): Promise<{ token: string }> {
    return this.authService.login(req);
  }

  @Post("validate-token")
  async validateToken(@Body() token: any) {
    return this.authService.validateToken(token);
  }

  @Security("jwt")
  @Get("logout")
  async logout(@Request() req: any) {
    return this.authService.logout(req);
  }

  @Security("jwt")
  @Get("logout-all")
  async logoutFromAllDevices(@Request() req: any) {
    return this.authService.logoutFromAllDevices(req);
  }

  @Get("/confirm-email/{authToken}")
  async emailConfirmation(@Path() authToken: string): Promise<void> {
    return this.authService.emailConfirmation({ authToken });
  }
}
