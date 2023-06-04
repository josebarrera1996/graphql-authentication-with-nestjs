/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { LoginUserInput } from './dto/login-user-input';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  // Inyección de dependencias
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // Método para validar a el usuario a logear
  async validateUser(username: string, password: string): Promise<any> {
    // Traer a un usuario específico de la Mock DB
    const user = await this.usersService.findOne(username);

    // Comparar ambas passwords (la de texto plano con la hasheada)
    const valid = await bcrypt.compare(password, user?.password);

    // Chequear si el mismo existe y si las password coincidens
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
      access_token: this.jwtService.sign({
        username: user.username,
        sub: user.id,
      }),
      user: user,
    };
  }

  // Método para registrarse
  async signup(loginUserInput: LoginUserInput) {
    // Chequeando que el usuario no exista ya
    const user = await this.usersService.findOne(loginUserInput.username);

    if (user) {
      throw new Error('User already exists!');
    }

    // Hasheando la password
    const password = await bcrypt.hash(loginUserInput.password, 10);

    return this.usersService.create({
      ...loginUserInput,
      password,
    });
  }
}
