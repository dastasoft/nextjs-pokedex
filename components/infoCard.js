const InfoCard = ({ height, weight, generation }) => {
  const label = 'text-white font-semibold mb-1';
  const text = 'text-black font-bold';

  return (
    <div className="bg-blue-600 rounded-md p-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className={label}>Height</p>
          <p className={text}>{height}</p>
        </div>
        <div>
          <p className={label}>Generation</p>
          <p className={text}>{generation}</p>
        </div>
        <div>
          <p className={label}>Weight</p>
          <p className={text}>{weight}</p>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
