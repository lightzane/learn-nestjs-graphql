import { Field, InputType, ObjectType } from "@nestjs/graphql";

@ObjectType()
@InputType('PokemonMoveInput')
export class PokemonMove {
    @Field()
    name: string;

    @Field()
    type: string;
}