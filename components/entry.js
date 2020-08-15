import Link from 'next/link';

import Types from './types';

export default function Entry({ id, name, sprites, types }) {
  return (
    <div>
      <figure className="bg-gray-200 rounded-sm">
        <Link href="pokemon/[name]" as={`pokemon/${name}`}>
          <img
            className="w-full cursor-pointer"
            src={sprites?.other['official-artwork']['front_default']}
            alt={`${name} Thumbnail`}
          />
        </Link>
      </figure>
      <div className="bg-gray-100 px-1">
        <p className="text-xs text-gray-500 font-bold ">#{id}</p>
        <p className="text-xl font-bold mt-1">
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </p>
        <Types types={types} woTitle sm />
      </div>
    </div>
  );
}
