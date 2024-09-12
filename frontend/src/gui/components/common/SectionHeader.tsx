/**
 * Reusable H2 Element for section
 * @returns
 */

type THeader = {
  title: string;
};

const SectionHeader: React.FC<THeader> = ({ title }) => {
  return (
    <h2 className="text-lg font-medium text-slate-600 mb-2 mt-5">{title}</h2>
  );
};

export default SectionHeader;
