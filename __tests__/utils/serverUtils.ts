import { MockedResponse } from 'msw';

// @ts-ignore
// eslint-disable-next-line consistent-return
export default (req, res, ctx): void | MockedResponse => {
    if (!req.headers.get('Authorization') || (Boolean(req.headers.get('Authorization')) && req.headers.get('Authorization').trim().length === 0)) {
        return res(ctx.status(401));
    }
};
