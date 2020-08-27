export interface ILinks {
    self: string;
    html: string;
    photos: string;
    likes: string;
    portfolio: string;
}

export interface IUser {
    id: string;
    // eslint-disable-next-line
    updated_at: Date;
    username: string;
    name: string;
    // eslint-disable-next-line
    portfolio_url: string;
    bio: string;
    location: string;
    // eslint-disable-next-line
    total_likes: number;
    // eslint-disable-next-line
    total_photos: number;
    // eslint-disable-next-line
    total_collections: number;
    links: ILinks;
}

export interface IPhoto {
    id: string;
    // eslint-disable-next-line
    alt_description: string;
    description: string;
    links: ILinks;
    user: IUser;
    urls: {
        raw: string;
        full: string;
        regular: string;
        small: string;
        thumb: string;
    };
}
