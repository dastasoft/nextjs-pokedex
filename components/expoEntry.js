import { useQuery } from 'react-query';

import QueryHandler from './queryHandler';
import Entry from './entry';

const fetchEntry = async (key, url) => {
  const res = await fetch(url);
  return res.json();
};

export default function ExpoEntry({ url }) {
  const { data, status } = useQuery(['entry', url], fetchEntry);

  return (
    <QueryHandler status={status}>
      <Entry {...data} />
    </QueryHandler>
  );
}
