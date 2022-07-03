import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { AddPokemonMoveInput } from './dto/add-pokemon-move.input';
import { CreatePokemonInput } from './dto/create-pokemon.input';
import { DeletePokemonMoveInput } from './dto/delete-pokemon-move.args';
import { GetMultiplePokemonArgs } from './dto/get-multiple-pokemon.input';
import { GetPokemonArgs } from './dto/get-pokemon.args';
import { UpdatePokemonInput } from './dto/update-pokemon.input';
import { Pokemon } from './models/pokemon.model';
import { PokemonService } from './pokemon.service';

@Resolver()
export class PokemonResolver {

    constructor(private readonly pokemonService: PokemonService) { }

    @Query(() => [Pokemon], { nullable: true })
    getAllPokemon(): Pokemon[] {
        return this.pokemonService.getAllPokemon();
    }

    @Mutation(() => Pokemon, { name: 'addPokemon', description: 'Inserts new data or Pokemon' })
    createPokemon(@Args('createPokemonInput') createPokemonInput: CreatePokemonInput): Pokemon {
        return this.pokemonService.createPokemon(createPokemonInput);
    }

    @Query(() => Pokemon, { name: 'getPokemon', description: 'Get a single Pokemon', nullable: true })
    readPokemon(@Args() getPokemonArgs: GetPokemonArgs): Pokemon {
        return this.pokemonService.getPokemon(getPokemonArgs);
    }

    @Query(() => [Pokemon], { nullable: 'items' }) // nullable is === 'items' since you accept null values in the 'items' of the array
    getMultiplePokemon(@Args() getMultiplePokemonArgs: GetMultiplePokemonArgs): Pokemon[] {
        return this.pokemonService.getMultiplePokemon(getMultiplePokemonArgs);
    }

    @Mutation(() => Pokemon)
    updatePokemon(@Args('updatePokemonInput') updatePokemonInput: UpdatePokemonInput): Pokemon {
        return this.pokemonService.updatePokemon(updatePokemonInput);
    }

    @Mutation(() => Pokemon, { description: 'Returns the deleted pokemon' })
    deletePokemon(@Args() deletePokemonInput: GetPokemonArgs): Pokemon {
        return this.pokemonService.deletePokemon(deletePokemonInput);
    }

    @Mutation(() => Pokemon, { name: 'addMove', description: 'Add moves to the Pokemon with given id' })
    addPokemonMove(@Args('addPokemonMoveInput') addPokemonMoveInput: AddPokemonMoveInput): Pokemon {
        return this.pokemonService.addPokemonMove(addPokemonMoveInput);
    }

    @Mutation(() => Pokemon, { name: 'deleteMove', description: 'Let the Pokemon forget the move' })
    deletePokemonMove(@Args('deletePokemonMoveInput') deletePokemonMoveArgs: DeletePokemonMoveInput): Pokemon {
        return this.pokemonService.deletePokemonMove(deletePokemonMoveArgs);
    }

}
