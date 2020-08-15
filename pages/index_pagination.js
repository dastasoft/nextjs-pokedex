import { useState } from 'react';
import { usePaginatedQuery } from 'react-query';
import { ReactQueryDevtools } from 'react-query-devtools';

import QueryHandler from '../components/queryHandler';
import ExpoEntry from '../containers/expoEntry';

const fetchPokemons = async (key, page, limit) => {
  const offset = (page - 1) * limit;
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`
  );
  return res.json();
};

export default function Home({ initialPokemonList }) {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const { resolvedData, latestData, status } = usePaginatedQuery(
    ['pokemonList', page, limit],
    fetchPokemons,
    {
      initialData: initialPokemonList
    }
  );

  return (
    <div>
      <div className="p-4 w-1/2 mx-auto">
        <QueryHandler status={status}>
          <div className="flex justify-around py-4">
            <button
              onClick={() => setPage(old => Math.max(old - 1, 1))}
              disabled={page === 1}
            >
              Prev
            </button>
            <button
              onClick={() =>
                setPage(old =>
                  !latestData || !latestData.next ? old : old + 1
                )
              }
              disabled={!latestData || !latestData.next}
            >
              Next
            </button>
          </div>
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {resolvedData?.results?.map(({ url }) => {
              return <ExpoEntry url={url} />;
            })}
          </div>
        </QueryHandler>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon/');
  const initialPokemonList = await res.json();

  return {
    props: {
      initialPokemonList
    }
  };
}
