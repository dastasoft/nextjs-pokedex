export function getInitialPokemonList(initialPokemonList) {
  return initialPokemonList?.results?.map(({ name }) => ({
    params: {
      name
    }
  }));
}
