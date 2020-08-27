import { IPhoto } from '~types/models/IPhoto';

export interface IPictureSeller {
    name: string;
    lastName: string;
    points: number;
    foundPictures: Record<string, IPhoto>;
}
