import { useState, useRef } from 'react';
import { useInfiniteQuery } from 'react-query';
import { ReactQueryDevtools } from 'react-query-devtools';
import Head from 'next/head';

import QueryHandler from '../components/queryHandler';
import ExpoEntry from '../components/expoEntry';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const fetchPokemons = async (key, next) => {
  const url = next ? next : 'https://pokeapi.co/api/v2/pokemon/';
  const res = await fetch(url);
  return res.json();
};

export default function Home({ initialPokemonList }) {
  const [enableFetchMore, setEnableFetchMore] = useState(false);
  const {
    status,
    data,
    error,
    isFetching,
    isFetchingMore,
    fetchMore,
    canFetchMore
  } = useInfiniteQuery('pokemonList', fetchPokemons, {
    initialData: [initialPokemonList],
    getFetchMore: lastGroup => lastGroup?.next
  });

  const loadMoreButtonRef = useRef();

  useIntersectionObserver({
    target: loadMoreButtonRef,
    onIntersect: fetchMore,
    enabled: enableFetchMore && canFetchMore
  });

  const onFetchMoreHandler = () => {
    if (!enableFetchMore) setEnableFetchMore(true);
    fetchMore();
  };

  return (
    <div>
      <Head>
        <title>Pokedex</title>
      </Head>
      <div className="p-4 w-1/2 mx-auto">
        <QueryHandler status={status}>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {data.map((group, i) => (
              <React.Fragment key={i}>
                {group?.results.map(({ name, url }) => {
                  return <ExpoEntry key={name} url={url} />;
                })}
              </React.Fragment>
            ))}
          </div>
          <div className="py-4 flex justify-center placeholder-yellow-400">
            <button
              className={`${
                !canFetchMore || isFetchingMore
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-blue-600 cursor-pointer'
              } py-3 px-4 text-white rounded-md font-bold cursor-pointer`}
              ref={loadMoreButtonRef}
              onClick={onFetchMoreHandler}
              disabled={!canFetchMore || isFetchingMore}
            >
              {isFetchingMore
                ? 'Loading more...'
                : canFetchMore
                ? 'Load More'
                : 'Nothing more to load'}
            </button>
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
