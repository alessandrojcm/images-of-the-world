import fs from 'fs';
import path from 'path';
import { defaultContext, ResponseTransformer } from 'msw';

export function getImageBuffer() {
    return fs.readFileSync(path.resolve(__dirname, 'puppy.jpg'));
}

export function getImageTransformer(ctx: typeof defaultContext & { body: (s: any) => ResponseTransformer }) {
    const image = getImageBuffer();

    return [ctx.set('Content-Length', image.byteLength.toString()), ctx.set('Content-Type', 'image/jpeg'), ctx.body(image)];
}

export function expectedBase64() {
    const image = getImageBuffer();
    return `data:image/jpeg;base64,${image.toString('base64')}`;
}
