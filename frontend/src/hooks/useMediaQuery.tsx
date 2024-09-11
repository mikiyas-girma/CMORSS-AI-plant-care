import { useContext } from 'react';
import { MediaQueryContext } from '@/contexts/MediaQueryContext';

const useMediaQuery = () => {
    const context = useContext(MediaQueryContext);

    if (!context) throw new Error('Using media query hook outside its provider.');

    return context;
}

export default useMediaQuery;