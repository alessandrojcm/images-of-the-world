import ky from 'ky-universal';
import { from, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { IImageSeller, IJourneyCreation, IJourneyPagination } from '~types/models';
import { ICurrentUserContext } from '~types/props';

const api = ky.create({
    prefixUrl: process.env.IOTW_API,
});

const createJourney = (user: Omit<ICurrentUserContext, 'userLoggedIn' | 'loading' | 'journeyId'>) =>
    from(
        api
            .post('journey', {
                json: user,
            })
            .json() as Promise<IJourneyCreation>
    );

const addPointsToSeller = (journeyId: string, seller: Omit<IImageSeller, 'sellerName'>) =>
    from(
        api
            .patch(`journey/${journeyId}`, {
                json: seller,
            })
            .json() as Promise<IJourneyCreation>
    );

const getJourneyState = (journeyId: string) => from(api.get(`journey/${journeyId}`).json() as Promise<IJourneyCreation>);

const getJourneyWinner = (journeyId: string) =>
    from(api.get(`journey/${journeyId}/winner`).json() as Promise<IImageSeller>).pipe(
        catchError((err: Response) => {
            if (err.status === 400) {
                return of(undefined);
            }
            return throwError(err);
        })
    );

const getJourneysSellers = (journeyId: string) => from(api.get(`journey/${journeyId}/sellers`).json() as Promise<IImageSeller[]>);

const getJourneySeller = (journeyId: string, sellerId: string) => from(api.get(`journey/${journeyId}/sellers/${sellerId}`).json() as Promise<IImageSeller>);

const getJourneys = (size = 10, after?: string, before?: string) =>
    from(api.get('journey', { searchParams: { size, ...(after && { after }), ...(before && { before }) } }).json() as Promise<IJourneyPagination>);

export { getJourneyState, createJourney, addPointsToSeller, getJourneySeller, getJourneyWinner, getJourneys, getJourneysSellers };
