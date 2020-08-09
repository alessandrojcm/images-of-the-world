import ky from 'ky-universal';
import { from } from 'rxjs';

import { IImageSeller } from '~types/models';

const api = ky.create({
    prefixUrl: process.env.IOTW_API,
});

const getSellers = from(api.get('sellers').json() as Promise<IImageSeller[]>);

// eslint-disable-next-line
export { getSellers };
