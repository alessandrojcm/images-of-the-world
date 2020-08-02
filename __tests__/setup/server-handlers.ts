import { rest } from 'msw';
import fs from 'fs';
import path from 'path';

const unsplashApi = process.env.UNSPLASH_API_URL;
const unplashImagesApi = 'https://images.unplash.com';

// @ts-ignore
const authorize = (req, res, ctx) => {
    if (!req.headers.get('Authorization') || (Boolean(req.headers.get('Authorization')) && req.headers.get('Authorization').trim().length === 0)) {
        return res(ctx.status(401));
    }
};

export const handlers = [
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
        const image = fs.readFileSync(path.resolve(__dirname + '/puppy.jpg'));

        return res(ctx.set('Content-Length', image.byteLength.toString()), ctx.set('Content-Type', 'image/jpeg'), ctx.body(image.buffer));
    }),
];
