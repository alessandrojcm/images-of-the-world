import tw, { styled } from 'twin.macro';
import ButtonCommon from '../../components/Button';

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
