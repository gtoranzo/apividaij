import { Injectable, NotFoundException, Request } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarios: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(user: any) {
    const getUser = await this.usuarios.findUsername(user.username);
    if (getUser) {
      if (!bcrypt.compareSync(user.password, getUser.password)) {
        return new NotFoundException(`Contraseña incorrecta`);
      } else {
        delete getUser.password;
        const payload = {
          user: getUser,
        };
        const accessToken = await this.jwtService.sign(payload);
        return { accessToken };
      }
    }
    return new NotFoundException(`Usuario incorrecto`);
  }

  async logged(tkn: any) {
    const limpio = tkn.replace(/^Bearer\s/, '');
    const datos = await this.jwtService.verify(limpio);
    return { datos };
  }
}
