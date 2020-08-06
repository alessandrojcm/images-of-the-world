import fs from 'fs';
import path from 'path';

export default async (lngId: string) => {
    try {
        const locale = fs.readFileSync(path.resolve(__dirname, `../../static/locales/${lngId}`));

        return JSON.parse(locale.toString());
    } catch {
        return {};
    }
};
