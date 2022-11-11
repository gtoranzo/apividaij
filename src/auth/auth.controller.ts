import { Controller, Get, Post, Request, Response } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Request() req) {
    return await this.authService.signIn(req.body);
  }

  @Get('/logged')
  async logged(@Request() req) {
    const optn = req.headers['authorization'];
    return await this.authService.logged(optn);
  }
}
