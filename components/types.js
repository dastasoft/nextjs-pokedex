const typeBgColor = {
  grass: 'bg-green-500',
  fire: 'bg-red-500',
  water: 'bg-blue-500',
  poison: 'bg-purple-500',
  bug: 'bg-green-800',
  ice: 'bg-blue-300',
  psychic: 'bg-purple-400',
  electric: 'bg-yellow-600',
  ground: 'bg-yellow-900',
  fighting: 'bg-red-900',
  steel: 'bg-gray-700',
  flying: 'bg-blue-300',
  ghost: 'bg-purple-800',
  rock: 'bg-orange-900',
  normal: 'bg-gray-500',
  default: 'bg-indigo-700'
};

const Types = ({ types = [], woTitle = false, sm = false }) => {
  return (
    <div className="py-4">
      {!woTitle && <p className="text-black font-bold text-xl mb-2">Type</p>}
      {types?.map(type => {
        const theName = type?.type?.name;
        return (
          <span
            key={theName}
            className={`text-white ${
              sm ? 'px-4' : 'py-1 px-6'
            }  rounded-md inline-block text-sm font-semibold mr-2 ${
              typeBgColor[theName] ? typeBgColor[theName] : typeBgColor.default
            }`}
          >
            {theName.charAt(0).toUpperCase() + theName.slice(1)}
          </span>
        );
      })}
    </div>
  );
};

export default Types;
