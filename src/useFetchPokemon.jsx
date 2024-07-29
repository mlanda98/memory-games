const api = "https://pokeapi.co/api/v2/pokemon";

export const fetchPokemon = async (pokemonId) => {
  const response = await fetch (`${api}/${pokemonId}`);
  const pokemonJson = await response.json();
  return pokemonJson;
};

export const fetchPokemonData = async (num = 8) => {
  const pokemonPromises = [];
  for (let i = 1; i <= num; i++){
    const randomId = Math.floor(Math.random() * 151) + 1;
    pokemonPromises.push(fetchPokemon(randomId));
  }

  const pokemonData = await Promise.all(pokemonPromises);
  console.log("Fetched Pokemon Data:", pokemonData);
  return pokemonData.map(pokemon => ({
    id: pokemon.id,
    image: pokemon.sprites.front_default,
  }))
}



