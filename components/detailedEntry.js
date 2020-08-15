// generation - https://pokeapi.co/api/v2/pokemon-species/{id or name}/
// height - The height of this Pokémon in decimetres
// weight - The weight of this Pokémon in hectograms
// stats

import Head from 'next/head';

import InfoCard from './infoCard';
import Types from './types';

export default function DetailedEntry({
  id,
  name,
  height,
  weight,
  types,
  sprites
}) {
  const theName = name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <div className="p-4">
      <Head>
        <title>Pokedex - {theName}</title>
      </Head>
      <div className="text-4xl font-bold flex justify-center mt-2 mb-8">
        <span className="mr-4">{theName}</span>
        <span className="text-gray-600">#{id}</span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <figure className="bg-gray-200 rounded-sm">
          <img
            className="w-full"
            src={sprites?.other['official-artwork']['front_default']}
            alt={`${theName} Thumbnail`}
          />
        </figure>
        <div className="flex flex-col justify-center">
          <InfoCard height={height} weight={weight} />
          <Types types={types} />
          <div>
            <p className="text-black font-bold text-xl">Stats</p>
          </div>
        </div>
      </div>
    </div>
  );
}
