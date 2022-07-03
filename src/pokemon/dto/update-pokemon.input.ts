import { Field, InputType, PartialType } from "@nestjs/graphql";
import { CreatePokemonInput } from "./create-pokemon.input";

@InputType() // Use @InputType() usually if input is object so you can store in variable in GraphQL
export class UpdatePokemonInput extends PartialType(CreatePokemonInput) {
    @Field()
    id: string;
}