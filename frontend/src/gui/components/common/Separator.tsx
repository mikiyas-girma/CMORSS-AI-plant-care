/**
 * Separator Component
 * @returns <hr />
 */

type SeparatorProp = {
  color?: string;
  className?: string;
};

const Separator: React.FC<SeparatorProp> = ({ color, className }) => {
  return (
    <hr
      className={`${className} ${color || 'bg-slate-300'} h-[1px] w-full  my-4`}
    />
  );
};

export default Separator;
