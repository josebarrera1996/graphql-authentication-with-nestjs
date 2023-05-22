/* eslint-disable prettier/prettier */
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  // Inyección de dependencias
  constructor(private authService: AuthService) {
    super();
  }

  // Implementando el método para validar a el usuario a nivel local
  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    // Si no es válido...
    if (!user) {
        throw new UnauthorizedException();
    }
    return user;
  }
}
