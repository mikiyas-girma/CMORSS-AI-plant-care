import React from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

type TActionBar = {
  searchText: string;
  handleSearch: () => Promise<string | number | undefined>;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  setShowCreateModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const ActionBar: React.FC<TActionBar> = ({
  searchText,
  handleSearch,
  setSearchText,
  setShowCreateModal,
}) => {
  return (
    <div className="my-1 flex p-2 rounded-lg flex-wrap gap-2 place-content-center">
      <Input
        placeholder="Search by Title"
        className="p-3 bg-white md:min-w-[300px] w-full"
        value={searchText}
        onChange={(event) => setSearchText(event.currentTarget.value)}
      />

      <Button
        children={<p>Search</p>}
        onClick={handleSearch}
        className="bg-primary-orange md:min-w-[150px]"
      />

      <Button
        children={<p>Create New Journal</p>}
        onClick={() => setShowCreateModal((prev) => !prev)}
        className="bg-primary-green"
      />
    </div>
  );
};

export default ActionBar;
