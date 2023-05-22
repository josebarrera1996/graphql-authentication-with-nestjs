import { InputType, Int, Field } from '@nestjs/graphql';

// DTO para validar la creación de nuevos usuarios
@InputType()
export class CreateUserInput {
  @Field(() => Int)
  id: number;

  @Field()
  username: string;

  @Field()
  password: string;
}
