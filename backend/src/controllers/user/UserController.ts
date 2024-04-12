import {
  Controller,
  Route,
  Get,
  Post,
  Delete,
  Body,
  Path,
  Security,
} from "tsoa";

interface UpdateProfileRequest {}

@Route("profile")
export class UserController extends Controller {
  @Security("jwt")
  @Get("user-profile-info")
  async getUser() {
    return { data: "User Profile Info" };
  }

  @Security("jwt")
  @Post("update-profile")
  async updateProfile(@Body() _request: UpdateProfileRequest) {
    return { data: "Profile updated successfully" };
  }

  @Security("jwt")
  @Get("all-users")
  async getAllUsers() {
    return { data: "List of all users" };
  }

  @Security("jwt")
  @Delete("delete-user/{userId}")
  async deleteUser(@Path() userId: string) {
    return { data: `User with ID ${userId} deleted successfully` };
  }

  @Security("jwt")
  @Get("user/{userId}")
  async getUserById(@Path() userId: string) {
    return { data: `Details of user ID ${userId}` };
  }
}
