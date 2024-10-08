import EmptyJournal from '@/assets/common/empty_box.png';

type TEmpty = {
  message: string;
};
/**
 * REnders the Empty
 * Journal Illustration
 * @returns
 */
const EmptyJournalHistory: React.FC<TEmpty> = ({ message }) => {
  return (
    <div className="flex flex-col justify-center items-center animate-fadein text-center ">
      <img
        src={EmptyJournal}
        alt="No Journal History."
        className="max-w-[400px] w-full"
      />
      <h2 className="text-4xl md:text-7xl font-black text-slate-700 -mt-12 mb-4">
        Ooops!
      </h2>
      <p className="md:text-base text-sm">{message}</p>
    </div>
  );
};

export default EmptyJournalHistory;
