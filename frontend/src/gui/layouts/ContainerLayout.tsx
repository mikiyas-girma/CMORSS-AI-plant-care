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
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-primary-green sm:p-10">
      {/* Just vanity element hehe */}
      <div
        className="absolute flex h-[100%] w-[50%] min-w-[900px] items-center justify-center rounded-[1000px] bg-white bg-opacity-[5%]"
        role="presentation"
      >
        <div
          className="absolute h-[70%] w-[70%] rounded-[1000px] bg-white bg-opacity-[5%]"
          role="presentation"
        ></div>
      </div>

      {/* Ender all other Route outlets */}
      <div className="z-10 mx-auto flex h-full w-full flex-col items-center justify-center overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default ContainerLayout;
