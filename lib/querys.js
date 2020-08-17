export const fetchPokemons = async (key, next) => {
  const url = next ? next : 'https://pokeapi.co/api/v2/pokemon/';
  const res = await fetch(url);
  return res.json();
};

export const fetchPokemonByName = async (key, name) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  return res.json();
};
