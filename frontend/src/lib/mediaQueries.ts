export enum MediaQueryResponse {
    IS_SMALL,
    IS_MEDIUM,
    IS_LARGE,
    IS_XLARGE,
    IS_XXLARGE,
}

export const MEDIA_BREAKPOINTS = [
    {
        size: 'sm',
        queryString: '(max-width: 576px)',
        queryResponse: MediaQueryResponse.IS_SMALL,
    },
    {
        size: 'md',
        queryString: '(min-width: 577px) and (max-width: 768px)',
        queryResponse: MediaQueryResponse.IS_MEDIUM
    },
    {
        size: 'lg',
        queryString: '(min-width: 769px) and (max-width: 992px)',
        queryResponse: MediaQueryResponse.IS_LARGE
    },
    {
        size: 'xl',
        queryString: '(min-width: 993px) and (max-width: 1200px)',
        queryResponse: MediaQueryResponse.IS_XLARGE
    },
    {
        size: 'xxl',
        queryString: '(min-width: 1201px)',
        queryResponse: MediaQueryResponse.IS_XXLARGE
    }
] as const;

export type MediaQueryValue = typeof MEDIA_BREAKPOINTS[number];
