import { ReactNode } from 'react';

/**
 * The container that houses the major routes
 * with the green background
 * @returns the children centered on teh screen
 */

type ContainerProp = {
  children: ReactNode;
};

const ContainerLayout: React.FC<ContainerProp> = ({ children }) => {
  return (
    <div className="bg-primary-green w-full min-h-screen flex justify-center items-center relative p-10 overflow-hidden">
      {/* Just vanity element hehe */}
      <div
        className="w-[50%] min-w-[900px] h-[100%] bg-white bg-opacity-[5%] absolute rounded-[1000px] flex justify-center items-center"
        role="presentation"
      >
        <div
          className="w-[70%] h-[70%] bg-white bg-opacity-[5%] absolute rounded-[1000px]"
          role="presentation"
        ></div>
      </div>

      {/* Ender all other Route outlets */}
      <div className="w-full mx-auto h-full z-10 flex flex-col justify-center items-center overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default ContainerLayout;
