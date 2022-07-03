import { Field, ObjectType } from "@nestjs/graphql";
import { PokemonMove } from "./pokemon-move.model";

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