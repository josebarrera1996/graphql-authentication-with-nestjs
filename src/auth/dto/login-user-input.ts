/* eslint-disable prettier/prettier */
import { Field, InputType } from "@nestjs/graphql";

// DTO para validar el login de un usuario
@InputType()
export class LoginUserInput {
    @Field()
    username: string;

    @Field()
    password: string;
}