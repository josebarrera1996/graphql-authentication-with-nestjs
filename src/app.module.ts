import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // Configurando GraphQL para toda la app
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // Code-first
      // Generando el GraphQL Schema
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
