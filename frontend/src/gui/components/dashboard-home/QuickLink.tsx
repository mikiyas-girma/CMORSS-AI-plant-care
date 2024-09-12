import React from 'react';
import { Link } from 'react-router-dom';

type TShortcut = {
  image: string;
  title: string;
  className: string;
  description: string;
  route: string;
};

const QuickLink: React.FC<TShortcut> = ({
  image,
  title,
  className,
  description,
  route,
}) => {
  return (
    <Link to={route}>
      <article
        className={`${className} rounded-lg  w-[170px] h-fit p-4 text-center text-white hover:scale-90 transition-all ease-in-out duration-500 hover:bg-opacity-85`}
      >
        <div className="mx-auto w-[60%] object-contain transition-all duration-500 ease-in-out hover:scale-[120%] hover:drop-shadow-2xl">
          <img src={image} alt={title} />
        </div>
        <p className="font-bold xl:text-lg">{title}</p>
        <p className="text-xs">{description}</p>
      </article>
    </Link>
  );
};

export default QuickLink;
