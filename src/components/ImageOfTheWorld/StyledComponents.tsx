import tw, { styled } from 'twin.macro';

import FullPageLoader from '../FullPageLoader';

export const Loader = styled(FullPageLoader)`
    ${tw`w-auto rounded-t bg-black h-auto p-12`}
`;

export const Section = tw.section`
    row-start-2
    row-end-6
    col-span-2
    transition-all
    duration-200
    ease-in-out
    translate-y-0
    transform
    hover:-translate-y-4
    overflow-hidden
`;

export const Details = styled.span`
    ${tw`bg-orange-100 cursor-pointer block rounded-b`};
    & > * {
        ${tw`font-subtitle text-black text-shadow`}
    }
    & > p {
        ${tw`font-body ml-4 text-black`}
    }
`;
