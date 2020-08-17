import { useQuery } from 'react-query';
import Link from 'next/link';

import DetailedEntry from '../../components/detailedEntry';
import QueryHandler from '../../components/queryHandler';
import { getInitialPokemonList } from '../../lib/pokemon';
import { fetchPokemonByName } from '../../lib/querys';

export default function Pokemon({ name, pokemonData }) {
  const { data, status } = useQuery(
    ['fetchPokemonByName', name],
    fetchPokemonByName,
    {
      initialData: pokemonData
    }
  );

  return (
    <div className="max-w-4xl mx-auto">
      <QueryHandler status={status}>
        <DetailedEntry {...data} />
      </QueryHandler>
      <div className="flex justify-center py-4">
        <Link href="/">
          <a className="bg-orange-600 py-3 px-4 text-white rounded-md font-bold cursor-pointer">
            Explore More Pokemon
          </a>
        </Link>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon/');
  const initialPokemonList = await res.json();
  const paths = getInitialPokemonList(initialPokemonList);

  return {
    paths,
    fallback: true
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.name}`);
  const pokemonData = await res.json();

  return {
    props: {
      name: params.name,
      pokemonData
    }
  };
}
