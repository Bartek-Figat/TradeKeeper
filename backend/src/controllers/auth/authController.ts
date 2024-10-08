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
} from "tsoa";
import { AuthService } from "../../services/authService/authService";
import {
  validateIncomingFields,
} from "../../middlewares/middleware";


@Route("auth")
export class CustomAuthController extends Controller {
  private authService = new AuthService();

  @Post("register")
  @Middlewares(validateIncomingFields)
  async registration(@Body() req: any): Promise<void> {
    return this.authService.registration(req);
  }

  @Post("login")
  @Middlewares(validateIncomingFields)
  async login(@Body() req: any): Promise<{ token: string; refreshToken: string }> {
    const { accessToken, refreshToken } = await this.authService.login(req);
    return { token: accessToken, refreshToken };
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

