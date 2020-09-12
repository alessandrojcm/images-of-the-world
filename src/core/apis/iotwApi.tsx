import ky from 'ky-universal';
import { from } from 'rxjs';

import { pluck } from 'rxjs/operators';
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

const getSellers = (journeyId: string) => from(api.get(`journey/${journeyId}`).json() as Promise<IJourneyCreation>).pipe(pluck('sellers'));

// eslint-disable-next-line
export { getSellers, createJourney, addPointsToSeller };
