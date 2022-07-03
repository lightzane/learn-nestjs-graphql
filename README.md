# learn-nestjs-graphql

Learning GraphQL (https://graphql.org/) using NestJS (https://nestjs.com/) application

## Test this Project

1. `npm run start:dev`
2. Open in `localhost:5000/my-graphql`
3. Run the following [queries](#graphql-queries-for-this-project)

## How this Project was Created

![](https://img.shields.io/badge/%40nestjs%2Fcli-8.2.7-red)

1. `nest new learn-nestjs-graphql`
2. `npm i graphql @nestjs/graphql apollo-server-express @nestjs/apollo`

### Import GraphQL

**app.module.ts**

```diff
+ import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
+ import { GraphQLModule } from '@nestjs/graphql';

 @Module({
   imports: [
+    GraphQLModule.forRoot<ApolloDriverConfig>({
+      driver: ApolloDriver,
+      autoSchemaFile: true,
+      path: 'my-graphql' // defaults to '/graphql'
+    })
   ],
 })
```

## GraphQL Setup Long

This setup is long or choose the short one. [GraphQL Short Setup here](#graphql-setup-short)

1. `npx nest g module pokemon`
2. `npx nest g service pokemon`
3. `npx nest g resolver pokemon` (to be used by GraphQL)
4. [Create Models](#create-models)
5. Update `pokemon.service.ts` with your logic ([see example](#pokemon-service))
6. Update [resolver](#resolver) for GraphQL to connect with `pokemon.service.ts`
7. `npm run start:dev` and open your `localhost`

## GraphQL Setup Short

This is using the `@nestjs/cli` schematics. And select the `GraphQL (code first)`

```
npx nest g resource pokemon
// Make sure to select the "GraphQL (code first)"
```

### Create Models

**src/pokemon/models/\*\***

```ts
// pokemon.model.ts
import { Field, ObjectType } from '@nestjs/graphql';
import { PokemonMove } from './pokemon-move';

@ObjectType()
export class Pokemon {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field(() => [String])
  type: string[];

  @Field(() => [PokemonMove], { nullable: true })
  moves?: PokemonMove[];
}
```

### Pokemon Service

**src/pokemon/pokemon.service.ts**

```ts
@Injectable()
export class PokemonService {
  // Data can come from a database, for now, use memory data
  private allPokemon: Pokemon[] = [];

  getAllPokemon(): Pokemon[] {
    return this.allPokemon;
  }
}
```

### Resolver

**src/pokemon/pokemon.resolver.ts**

```ts
import { Resolver, Query } from '@nestjs/graphql';
import { Pokemon } from './models/pokemon.model';
import { PokemonService } from './pokemon.service';

@Resolver()
export class PokemonResolver {
  constructor(private readonly pokemonService: PokemonService) {}

  @Query(() => [Pokemon], { nullable: true })
  getAllPokemon(): Pokemon[] {
    return this.pokemonService.getAllPokemon();
  }
}
```

## GraphQL Queries for this Project

1. [Create Pokemon](#create-pokemon)
2. [Get All Pokemon](#get-all-pokemon)
3. [Update Pokemon](#update-pokemon)
4. [Get Pokemon](#get-pokemon)
5. [Add Pokemon Move](#add-pokemon-move)

There's more just look it up on the `DOCS` and `SCHEMA` section of `GraphQL` that can be seen in `localhost:5000/my-graphql`

### Create Pokemon

**Note** Please see `src/pokemon/dto/create-pokemon.input.ts` for the comparison between `@ArgsType()` and `@InputType()`

**Request**

```graphql
mutation {
  addPokemon(createPokemonInput: { name: "Bulbasaur", type: "Grass" }) {
    id
    name
    type
  }
}
```

**Response**

```graphql
{
  "data": {
    "addPokemon": {
      "id": "62c1581b94248f3154dfbe9f",
      "type": [
        "Grass"
      ]
    }
  }
}
```

#### Alternatively using variable

**Query Request**

```graphql
mutation ($input: CreatePokemonInput!) {
  addPokemon(createPokemonInput: $input) {
    id
    name
    type
  }
}
```

**Query Variables**

```graphql
{
    "input": {
        "name": "Bulbasaur",
        "type": "Grass"
    }
}
```

### Get All Pokemon

**Request**

```graphql
{
  getAllPokemon {
    id
    name
    type
    moves {
      name
      type
    }
  }
}
```

**Response**

```graphql
{
  "data": {
    "getAllPokemon": [
      {
        "id": "62c1581b94248f3154dfbe9f",
        "name": "Bulbasaur",
        "type": [
          "Grass"
        ],
        "moves": []
      }
    ]
  }
}
```

### Update Pokemon

**Request**

```graphql
mutation ($input: UpdatePokemonInput!) {
  updatePokemon(updatePokemonInput: $input) {
    id
    name
    type
  }
}
```

**Query Variables**

```graphql
{
  "input": {
    "id": "62c1581b94248f3154dfbe9f",
    "type": ["Grass", "Poison"]
  }
}
```

**Response**

```graphql
{
  "data": {
    "updatePokemon": {
      "id": "62c1581b94248f3154dfbe9f",
      "name": "Bulbasaur",
      "type": [
        "Grass",
        "Poison"
      ]
    }
  }
}
```

### Get Pokemon

**Request**

```graphql
{
  getPokemon(id:"62c1581b94248f3154dfbe9f") {
    id
    name
    type
    moves {
      name
    }
  }
}]
```

**Response**

```graphql
{
  "data": {
    "getPokemon": {
      "id": "62c1581b94248f3154dfbe9f",
      "name": "Bulbasaur",
      "type": [
        "Grass",
        "Poison"
      ],
      "moves": []
    }
  }
}
```

### Add Pokemon Move

**Request**

```graphql
mutation ($input: AddPokemonMoveInput!) {
  addMove(addPokemonMoveInput: $input) {
    id
    name
    moves {
      name
      type
    }
  }
}
```

**Query Variables**

```graphql
{
  "input": {
    "id": "62c1581b94248f3154dfbe9f",
    "move": {
      "name": "Toxic",
      "type": "Poison"
    }
  }
}
```

**Response**

```graphql
{
  "data": {
    "addMove": {
      "id": "62c1581b94248f3154dfbe9f",
      "name": "Bulbasaur",
      "moves": [
        {
          "name": "Toxic",
          "type": "Poison"
        }
      ]
    }
  }
}
```

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
