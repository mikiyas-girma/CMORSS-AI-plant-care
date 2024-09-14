import React, { useMemo } from 'react';
import { formatRelativeTime } from '@/lib/utils';
import { PlantJournalType } from '@/types';

type JournalStatType = Pick<
  PlantJournalType,
  'name' | 'health' | 'species' | 'dateAcquired' | 'location'
>;

const healthColorMap = {
  Excellent: 'bg-green-500',
  Good: 'bg-green-800',
  Fair: 'bg-orange-800',
  Poor: 'bg-red-500',
};

const JournalPlantStat: React.FC<JournalStatType> = ({
  name,
  health,
  species,
  dateAcquired,
  location,
}) => {
  const healthColor = useMemo(
    () => healthColorMap[health] || 'bg-red-500',
    [health]
  );
  const formattedDate = useMemo(
    () => formatRelativeTime(new Date(dateAcquired)),
    [dateAcquired]
  );

  return (
    <div className="flex gap-2 flex-wrap text-[11px] sm:text-xs mt-3 cursor-default  md:justify-start justify-center">
      <StatItem label="Plant Name" value={name} />
      <StatItem label="Species" value={species} />
      <StatItem
        label="Health"
        value={health}
        className={`${healthColor}`}
        textColor={'text-white'}
      />
      <StatItem label="Location" value={location} />
      <StatItem label="Date Planted" value={formattedDate} />
    </div>
  );
};

export default JournalPlantStat;

const StatItem = ({ label, value, className = '', textColor = '' }) => (
  <div className="flex gap-2 p-1 bg-gray-neutral rounded-lg place-items-center">
    <p>{label}: </p>
    <p
      className={`${
        textColor ? textColor : 'text-slate-800'
      } font-medium px-3 py-1  rounded-md hover:bg-opacity-65  duration-500 ease-out ${
        className || 'bg-slate-300'
      }`}
    >
      {value}
    </p>
  </div>
);
