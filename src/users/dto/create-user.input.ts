import { InputType, Field } from '@nestjs/graphql';

// DTO para validar la creación de nuevos usuarios
@InputType()
export class CreateUserInput {
  @Field()
  username: string;

  @Field()
  password: string;
}
