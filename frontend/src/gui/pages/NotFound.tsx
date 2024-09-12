/**
 * Not found Component when a route
 * is not found / not yet implmeented.
 * @returns JSX For not found Page.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import NotFoundImage from '@/assets/common/NOTFOUND.jpg';

type NotFoundProp = {
  title?: string;
  subtext?: string;
  route?: string;
  buttonText?: string;
};

const NotFound: React.FC<NotFoundProp> = ({
  title,
  subtext,
  route,
  buttonText,
}) => {
  return (
    <div className="z-20 mx-auto flex items-center justify-center rounded-lg p-5 font-poppins">
      <div className="max-w-md text-center">
        {/* Not found image */}
        <div className="mx-auto mb-3 w-[80%] rounded-lg object-cover">
          <img src={NotFoundImage} className="w-full" />
        </div>

        {/* Paragraph */}
        <p className="text-2xl font-semibold">
          {title || "Sorry, we couldn't find this page."}
        </p>
        <p className="mx-auto mb-8 w-[80%] text-xs sm:text-base">
          {subtext || 'Please confirm the url you entered.'}
        </p>
        <Link
          to={route || '/'}
          className="inline-block rounded-lg bg-primary-orange px-6 py-3 text-xs font-semibold text-white transition-colors duration-300 ease-in-out hover:bg-primary-green sm:text-base"
        >
          {buttonText || 'Back to Homepage'}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
