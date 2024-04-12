import {
  Controller,
  Route,
  Post,
  Body,
  Middlewares,
  Security,
  Get,
  Path,
  Request,
} from "tsoa";
import { AuthService } from "../../services/authService/authService";
import {
  validateEmail,
  validateIncomingFields,
} from "../../middlewares/middleware";

@Route("api/auth")
export class AuthController extends Controller {
  private authService = new AuthService();

  @Post("registration")
  @Middlewares(validateIncomingFields)
  async registration(@Body() req: any): Promise<void> {
    return this.authService.registration(req);
  }

  @Post("login")
  @Middlewares(validateIncomingFields)
  async login(@Body() req: any): Promise<{ token: string }> {
    return this.authService.login(req);
  }

  @Get("activate/{token}")
  async emailConfirmation(@Path() token: string) {
    return this.authService.emailConfirmation(token);
  }

  @Get("reset-password")
  @Middlewares(validateEmail)
  async passwordUpdate(@Request() req: any) {
    return this.authService.generateAuniqueEmailForPasswordReset(req);
  }

  @Get("update-password")
  @Middlewares(validateEmail)
  async updatePassword(@Request() req: any) {
    return this.authService.updatePassword(req);
  }

  @Security("jwt")
  @Get("logout")
  async logout(@Request() req: any) {
    return this.authService.logout(req);
  }

  @Security("jwt")
  @Get("logout-from-all")
  async logoutFromAllDevices(@Request() req: any) {
    return this.authService.logoutFromAllDevices(req);
  }
}
