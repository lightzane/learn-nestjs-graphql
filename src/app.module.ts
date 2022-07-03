import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PokemonModule } from './pokemon/pokemon.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      path: 'my-graphql', // defaults to '/graphql'
      playground: true, // display GraphQL UI and enable in PRODUCTION mode (e.g. deploying in herokuapp)
      introspection: true // enable GraphQL server in PRODUCTION mode (e.g. deploying in herokuapp)
    }),
    PokemonModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
