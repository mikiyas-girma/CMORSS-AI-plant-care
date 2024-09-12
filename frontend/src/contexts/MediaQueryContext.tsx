import { createContext, ReactNode, useEffect, useState } from 'react';
import { MEDIA_BREAKPOINTS, MediaQueryValue } from '@/lib/mediaQueries';

export const MediaQueryContext = createContext<MediaQueryValue | null>(null);

export const MediaQueryProvider = ({children}: {children: ReactNode}) => {
    const [currentMedia, setCurrentMedia] = useState<MediaQueryValue | null>(null);

    useEffect(() => {
        const mediaQueries: Array<{
            queryList: MediaQueryList,
            handler: () => void
        }> = [];

        MEDIA_BREAKPOINTS.forEach(breakpoint => {
            const mediaQuery = window.matchMedia(breakpoint.queryString);
            const callback = () => setCurrentMedia(breakpoint);

            mediaQuery.addEventListener('change', callback);
            mediaQueries.push({
                queryList: mediaQuery,
                handler: callback
            });

            if (mediaQuery.matches)
                setCurrentMedia(breakpoint);
        });

        return () => {
            mediaQueries.forEach(mq => mq.queryList.removeEventListener('change', mq.handler));
        };
    });

    return (
        <MediaQueryContext.Provider value={currentMedia}>
            {children}
        </MediaQueryContext.Provider>
    );
}