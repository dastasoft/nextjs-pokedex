import { useQuery } from 'react-query';

import QueryHandler from './queryHandler';
import Entry from './entry';
import { fetchPokemonByName } from '../lib/querys';

export default function ExpoEntry({ name }) {
  const { data, status } = useQuery(
    ['fetchPokemonByName', name],
    fetchPokemonByName
  );

  return (
    <QueryHandler status={status}>
      <Entry {...data} />
    </QueryHandler>
  );
}
