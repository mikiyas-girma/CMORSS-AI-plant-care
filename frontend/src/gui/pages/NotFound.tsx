/**
 * Not found Component when a route
 * is not found / not yet implmeented.
 * @returns JSX For not found Page.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import NotFoundImage from '@/assets/common/NOTFOUND.jpg';

const NotFound: React.FC = () => {
  return (
    <div className="flex items-center justify-center bg-white p-5 mx-auto rounded-lg font-poppins z-20">
      <div className="max-w-md text-center">
        {/* Not found image */}
        <div className="w-[80%] mx-auto">
          <img src={NotFoundImage} />
        </div>

        {/* Paragraph */}
        <p className="text-2xl font-semibold">
          Sorry, we couldn't find this page.
        </p>
        <p className="mb-8 sm:text-base text-xs w-[80%] mx-auto">
          Please confirm the url you entered.
        </p>
        <Link
          to="/"
          className="px-6 py-3 rounded-lg font-semibold text-xs sm:text-base text-white bg-primary-orange hover:bg-primary-green transition-colors duration-300 ease-in-out inline-block"
        >
          Back to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
