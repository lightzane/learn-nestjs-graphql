import { Field, InputType } from "@nestjs/graphql";

@InputType() // Use @InputType() usually if input is object so you can store in variable in GraphQL
export class DeletePokemonMoveInput {
    @Field()
    id: string;

    @Field()
    moveName: string;
}