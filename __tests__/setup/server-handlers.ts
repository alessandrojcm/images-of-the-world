import { rest } from 'msw';

import { getImageTransformer } from '../utils/imageHandler';
import authorize from '../utils/serverUtils';
import loadLocale from '../utils/localesHandler';

const unsplashApi = process.env.UNSPLASH_API_URL;
export const unplashImagesApi = 'https://images.unplash.com';

export default [
    rest.get('*/locales/:lng', async (req, res, ctx) => {
        const locale = await loadLocale(req.params.lng);

        return res(ctx.json(locale));
    }),
    rest.get(`${unsplashApi}/photos/:id`, (req, res, ctx) => {
        authorize(req, res, ctx);
        const response = {
            alt_description: 'a photo',
            user: {
                name: 'auser',
            },
            links: {
                self: `${unsplashApi}/users/auser`,
            },
            urls: {
                raw: `${unplashImagesApi}/a-photo-mock-id`,
            },
        };
        return res(ctx.json(response));
    }),
    rest.get(`${unplashImagesApi}/:id`, async (req, res, ctx) => {
        authorize(req, res, ctx);

        return res(...getImageTransformer(ctx));
    }),
];
