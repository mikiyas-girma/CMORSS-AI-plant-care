import { Suspense } from 'react';
import { JSX } from 'react/jsx-runtime';

const Loadable = (Component: JSX.IntrinsicAttributes) => (
    function (props: JSX.IntrinsicAttributes) {

        return (
            <Suspense
                fallback={<Loader />}
            >
                <Component {...props} />
            </Suspense>
        )
    }
)