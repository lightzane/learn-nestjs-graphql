import { Field, InputType } from "@nestjs/graphql";
import { PokemonMove } from "../models/pokemon-move.model";

@InputType() // Use @InputType() usually if input is object so you can store in variable in GraphQL
export class AddPokemonMoveInput {
    @Field()
    id: string;

    @Field(() => PokemonMove)
    move: PokemonMove;
}