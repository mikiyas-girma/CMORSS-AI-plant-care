/* eslint-disable @typescript-eslint/no-explicit-any */
import { Suspense } from 'react';
import SuspenseFallback from './SuspenseFallback';

const Loadable = (Component: any) =>
  function (props: { [key: string]: unknown }) {
    return (
      <Suspense fallback={<SuspenseFallback />}>
        <Component {...props} />
      </Suspense>
    );
  };

export default Loadable;
