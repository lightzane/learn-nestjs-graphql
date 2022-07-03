import { Field, InputType } from "@nestjs/graphql";

@InputType() // Use @InputType() usually if input is object so you can store in variable in GraphQL
export class CreatePokemonInput {
    // You can also use 'class-validator' to validate the input fields
    @Field()
    name: string;

    @Field(() => [String])
    type: string[];
}

// ********* See Below Comparison on @InputType() and @ArgsType()

// ? ============= @InputType()
// * @InputType() effect on GraphQL === in Resolver, you need to provide a string insde @Args()
/**

mutation {
  addPokemon(createPokemonInput: { name: "Bulbasaur", type: "Grass" }) {
    id
    name
    type
  }
}

// * Alternatively, use @InputType() with variables

mutation ($input: CreatePokemonInput!) {
  addPokemon(createPokemonInput: $input) {
    id
    name
    type
  }
}

== Query Variable Sections: (Press Ctrl + Space to see declared variables)
{
    "input": {
        "name": "Bulbasaur",
        "type": "Grass"
    }
}

*/

// ? ============= @ArgsType()
// * @ArgsType() effect on GraphQL === in Resolver, you DONT need to provide a string inside @Args()
/**

mutation {
  addPokemon(name: "Bulbasaur", type: "Grass") {
    id
    name
    type
  }
}

*/