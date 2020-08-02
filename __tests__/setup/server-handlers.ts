import { rest } from 'msw';

import { getImageTransformer } from '../utils/imageHandler';
import authorize from '../utils/serverUtils';

const unsplashApi = process.env.UNSPLASH_API_URL;
export const unplashImagesApi = 'https://images.unplash.com';

export default [
    rest.get(`${unsplashApi}/photos/:id`, (req, res, ctx) => {
        authorize(req, res, ctx);
        const response = {
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
