import { ArgsType, Field } from "@nestjs/graphql";

@ArgsType()
export class GetMultiplePokemonArgs {
    @Field(() => [String])
    ids: string[];
}