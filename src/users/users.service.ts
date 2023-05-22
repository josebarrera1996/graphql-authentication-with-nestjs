import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';

@Injectable()
export class UsersService {
  // Mock D.B
  private readonly users = [
    {
      id: 1,
      username: 'jose',
      password: 'not-secure',
    },
    {
      id: 2,
      username: 'marius',
      password: 'not-secure',
    },
  ];

  // Crear un nuevo usuario en la Mock DB
  create(createUserInput: CreateUserInput) {
    // Objeto a insertar
    const user = {
      ...createUserInput,
      id: this.users.length++,
    };
    // Insertándolo
    this.users.push(user);

    return user;
  }

  // Traer todos los usuarios de la Mock DB
  findAll() {
    return this.users;
  }

  // Traer a un usuario en específico (gracias a su username) de la Mock DB
  findOne(username: string) {
    return this.users.find((user) => user.username === username);
  }
}
