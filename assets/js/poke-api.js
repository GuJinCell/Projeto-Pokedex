
const pokeApi = {}

function convertPokeApiDetails(pokemonDetails){
    const pokemon = new Pokemon()
    pokemon.number = pokemonDetails.id
    pokemon.name = pokemonDetails.name
    
    const types = pokemonDetails.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.type = type
    pokemon.types = types
    pokemon.photo =pokemonDetails.sprites.other.home.front_default

    return pokemon
}

pokeApi.getPokemonDetails = (pokemon) => {
    return fetch(pokemon.url).then((response) => response.json())
    .then(convertPokeApiDetails)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetails))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonDetails) => pokemonDetails)
}