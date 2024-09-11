import { Outlet } from 'react-router-dom';

/**
 * Index Page for the app rendering the
 * Auth and or Dashboard
 * @returns JSX Element to the page.
 */
export default function Index() {
  return (
    <div className="bg-primary-green w-full min-h-screen flex justify-center items-center relative p-10 overflow-hidden">
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
      <div className="w-full mx-auto h-full z-10 flex justify-center items-center">
        <Outlet />
      </div>
    </div>
  );
}
