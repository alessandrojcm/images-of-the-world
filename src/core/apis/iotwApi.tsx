import ky from 'ky-universal';
import { from, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IImageSeller, IJourneyCreation } from '~types/models';
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

const getJourneySeller = (journeyId: string, sellerId: string) => from(api.get(`journey/${journeyId}/sellers/${sellerId}`).json() as Promise<IImageSeller>);

export { getJourneyState, createJourney, addPointsToSeller, getJourneySeller, getJourneyWinner };
