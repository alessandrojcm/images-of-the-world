// twin.d.ts
import 'twin.macro';
import styledComponent from '@emotion/styled';
import { css as cssProperty } from '@emotion/core';
import tw from 'twin.macro';
export default tw;

declare module 'twin.macro' {
    const css: typeof cssProperty;
    const styled: typeof styledComponent;
}
