export interface IPhoto {
    id: string;
    // eslint-disable-next-line
    alt_description: string;
    description: string;
    urls: {
        raw: string;
        full: string;
        regular: string;
        small: string;
        thumb: string;
    };
}
