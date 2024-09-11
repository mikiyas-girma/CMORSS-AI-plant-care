import { Suspense } from 'react';
import AnimatedLogo from '../../assets/common/AnimatedLogo';

const Loadable = (Component) => (
    function (props: {[key: string]: unknown}) {

        return (
            <Suspense fallback={<AnimatedLogo width={250} height={250} />}>
                <Component {...props} />
            </Suspense>
        )
    }
)

export default Loadable;