import { LucideProps } from 'lucide-react';
import React from 'react';

type InfoProp = {
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >;
  value: string;
};

const InfoComp: React.FC<InfoProp> = ({ Icon, value }) => {
  return (
    <div className="-mt-1 flex flex-col items-center gap-1 text-center">
      <Icon />
      <p className="font-medium">{value}</p>
    </div>
  );
};

export default InfoComp;
