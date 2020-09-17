import { rest } from 'msw';

import { getImageTransformer } from '../utils/imageHandler';
import authorize from '../utils/serverUtils';
import loadLocale from '../utils/localesHandler';
import { IImageSeller, IJourneyCreation, IJourneyState } from '../../src/types/models';

const unsplashApi = process.env.UNSPLASH_API_URL;
export const unplashImagesApi = 'https://images.unplash.com';

const sellers = (length = 3): IImageSeller[] =>
    Array.from({ length }).map((_, i) => ({
        id: i.toString(),
        sellerName: `${i}`,
        points: 0,
        collectedImages: [],
    }));

const getSellersDict = (s: IImageSeller[]): Record<string, any> =>
    // @ts-ignore
    s.reduce(
        (prv: Pick<IJourneyState, 'sellers'>, curr: IImageSeller) => ({
            ...prv,
            [curr.id]: curr,
        }),
        {}
    );

const journey: IJourneyCreation = {
    sellers: getSellersDict(sellers()),
    user: {
        name: 'aname',
        lastName: 'alastname',
        email: 'user@user.com',
    },
    id: 'aid',
    winner: null,
};

const returnImage = () => {
    return {
        alt_description: 'a photo',
        user: {
            name: 'auser',
            links: {
                html: `${unsplashApi}/users/auser`,
            },
        },
        urls: {
            raw: `${unplashImagesApi}/a-photo-mock-id`,
        },
    };
};

export default [
    rest.get('*/locales/:lng', async (req, res, ctx) => {
        const locale = await loadLocale(req.params.lng);

        return res(ctx.json(locale));
    }),
    rest.get('*/journey', (req, res, ctx) => {
        const { size, after = '' } = req.params;

        return res(
            ctx.json({
                journeys: sellers(size),
                after,
            })
        );
    }),
    rest.get('*/journey/:id', (req, res, ctx) => {
        return res(ctx.json({ sellers: getSellersDict(sellers()) }));
    }),
    rest.get('*/journey/:id/sellers', (req, res, ctx) => {
        return res(ctx.json(getSellersDict(sellers())));
    }),
    rest.post('*/journey', (req, res, ctx) => {
        return res(ctx.json(journey));
    }),
    rest.patch('*/journey/:id', (req, res, ctx) => {
        const { body } = req as Record<string, any>;
        return res(
            ctx.json({
                ...journey,
                sellers: {
                    ...getSellersDict(sellers()),
                    [body.id]: {
                        ...body,
                        sellerName: 'aname',
                    },
                },
            })
        );
    }),
    rest.get(`${unsplashApi}/photos/:id`, (req, res, ctx) => {
        authorize(req, res, ctx);
        const response = returnImage();
        return res(ctx.delay(250), ctx.json(response));
    }),
    rest.get(`${unsplashApi}/photos/random`, (req, res, ctx) => {
        authorize(req, res, ctx);
        const response = returnImage();
        return res(ctx.delay(250), ctx.json(response));
    }),
    rest.get(`${unplashImagesApi}/:id`, async (req, res, ctx) => {
        authorize(req, res, ctx);

        return res(ctx.delay(250), ...getImageTransformer(ctx));
    }),
];
