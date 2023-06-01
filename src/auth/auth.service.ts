/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  // Inyección de dependencias
  constructor(private usersService: UsersService) {}

  // Método para validar a el usuario a logear
  async validateUser(username: string, password: string): Promise<any> {
    // Traer a un usuario específico de la Mock DB
    const user = await this.usersService.findOne(username);

    // Chequear si el mismo existe y si las password coinciden
    if (user && user.password === password) {
      // No traer el campo 'password'
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  // Método para poder logearse como un usuario
  async login(user: User) {
    return {
      access_token: 'jwt',
      user: user,
    };
  }
}
