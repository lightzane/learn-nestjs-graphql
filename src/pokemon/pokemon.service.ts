import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ObjectID } from '../shared/utilities/objectid';
import { AddPokemonMoveInput } from './dto/add-pokemon-move.input';
import { CreatePokemonInput } from './dto/create-pokemon.input';
import { DeletePokemonMoveInput as DeletePokemonMoveInput } from './dto/delete-pokemon-move.args';
import { GetMultiplePokemonArgs } from './dto/get-multiple-pokemon.input';
import { GetPokemonArgs } from './dto/get-pokemon.args';
import { UpdatePokemonInput } from './dto/update-pokemon.input';
import { Pokemon } from './models/pokemon.model';

@Injectable()
export class PokemonService {
    // Data can come from a database, for now, use memory data
    private allPokemon: Pokemon[] = [];

    private findPokemonWithId(id: string): Pokemon {
        const existingPokemon = this.allPokemon.find(pokemon => pokemon.id === id);
        if (!existingPokemon) { throw new NotFoundException('Pokemon not found'); }
        return existingPokemon;
    }

    getAllPokemon(): Pokemon[] {
        return this.allPokemon;
    }

    createPokemon(createPokemonInput: CreatePokemonInput): Pokemon {
        const { name } = createPokemonInput;
        const isExist = this.allPokemon.find(pokemon => new RegExp(name, 'gi').test(pokemon.name));

        if (isExist) { throw new BadRequestException('Pokemon already exists'); }

        const pokemon: Pokemon = {
            id: ObjectID(),
            ...createPokemonInput,
            moves: []
        };

        this.allPokemon.push(pokemon);

        return pokemon;
    }

    getPokemon(getPokemonInput: GetPokemonArgs): Pokemon {
        return this.allPokemon.find(pokemon => pokemon.id === getPokemonInput.id);
    }

    getMultiplePokemon(getMultiplePokemonArgs: GetMultiplePokemonArgs): Pokemon[] {
        return getMultiplePokemonArgs.ids.map(id => this.getPokemon({ id }));
    }

    updatePokemon(updatePokemonInput: UpdatePokemonInput): Pokemon {
        const existingPokemon = this.findPokemonWithId(updatePokemonInput.id);
        Object.assign(existingPokemon, updatePokemonInput);

        return existingPokemon;
    }

    deletePokemon(deletePokemonInput: GetPokemonArgs): Pokemon {
        const pokemonIdx = this.allPokemon.findIndex(pokemon => pokemon.id === deletePokemonInput.id);

        if (pokemonIdx < 0) { throw new NotFoundException('Pokemon not found'); }

        const [deletedPokemon] = this.allPokemon.splice(pokemonIdx, 1);
        return deletedPokemon;
    }

    addPokemonMove(addPokemonMoveInput: AddPokemonMoveInput): Pokemon {
        const { id, move } = addPokemonMoveInput;
        const existingPokemon = this.findPokemonWithId(id);
        if (existingPokemon.moves.length === 4) { throw new BadRequestException('Move limit reached'); }

        const existingMove = existingPokemon.moves.find(pkmnMove => new RegExp(move.name, 'gi').test(pkmnMove.name));
        if (existingMove) { throw new BadRequestException('Move already exist!'); }

        existingPokemon.moves.push(addPokemonMoveInput.move);
        return existingPokemon;
    }

    deletePokemonMove(deletePokemonMoveInput: DeletePokemonMoveInput): Pokemon {
        const { id, moveName } = deletePokemonMoveInput;
        const existingPokemon = this.findPokemonWithId(id);
        const existingMoveIdx = existingPokemon.moves.findIndex(pkmnMove => new RegExp(moveName, 'gi').test(pkmnMove.name));

        if (existingMoveIdx >= 0) {
            existingPokemon.moves.splice(existingMoveIdx, 1);
        }

        return existingPokemon;
    }
}
