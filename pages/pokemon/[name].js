import { useQuery } from 'react-query';
import Link from 'next/link';

import DetailedEntry from '../../components/detailedEntry';
import QueryHandler from '../../components/queryHandler';

const fetchPokemonByName = async (key, name) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  return res.json();
};

export default function Pokemon({ name, pokemonData }) {
  const { data, status } = useQuery(
    ['pokemonByName', name],
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
  return {
    paths: [
      {
        params: {
          name: 'charmander'
        }
      }
    ],
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
