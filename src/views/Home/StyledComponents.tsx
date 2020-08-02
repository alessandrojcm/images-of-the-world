import tw, { styled } from 'twin.macro';

import Button from '../../components/Button';

export const Container = tw.div`
    container
    flex flex-no-wrap flex-col
    items-center
    justify-center
    h-auto
    w-1/2
    p-5
`;

export const Title = tw.h1`
    text-5xl
    font-display
    pb-4
    text-shadow
`;

export const Subtitle = tw.h2`
    text-3xl
    font-subtitle
    text-shadow
`;

export const ButtonsContainer = tw.div`
    flex
    justify-around
    items-center
    w-1/2
    pt-4
`;

const ButtonCommon = styled(Button)`
    ${tw`rounded border-2`}
    *:first-child {
        ${tw`px-2`}
    }
`;

export const LeaderBoardButton = styled(ButtonCommon)`
    ${tw`border-orange-200 bg-orange-200 text-black`}
    *:first-child {
        ${tw`hover:text-primary`}
    }
`;

export const StartButton = styled(ButtonCommon)`
    ${tw`border-red bg-red text-orange-100`}
    *:first-child {
        ${tw`hover:text-black`}
    }
`;
