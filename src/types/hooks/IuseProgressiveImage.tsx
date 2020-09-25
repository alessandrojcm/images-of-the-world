export interface IuseProgressiveImage {
    placeholderImage: string | null;
    image: string | null;
    author?: string;
    alt?: string;
    authorProfileUrl?: string;
    isLoading: boolean;
    clear: () => void;
}
