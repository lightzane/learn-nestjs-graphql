import { ArgsType, Field } from "@nestjs/graphql";

@ArgsType() // Use @ArgsType() usually if input is single field
export class GetPokemonArgs {
    // You can also use 'class-validator' to validate the input fields
    @Field()
    id: string;
}

// Please see `src/pokemon/dto/create-pokemon.input.ts` to see the difference between `@InputType()` and `@ArgsType()`