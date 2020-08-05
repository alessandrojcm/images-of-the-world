import tw, { styled } from 'twin.macro';

import { Subtitle as BaseSubtitle } from '../../components/Typography';
import { ButtonsContainer as BaseButtonsContainer } from '../../components/Form';
import BaseButton from '../../components/Button';
import BaseContainer from '../../components/Container';

export const Container = styled(BaseContainer)`
    ${tw`w-auto items-start bg-orange-100 bg-opacity-75 rounded-lg shadow`};
    @supports (backdrop-filter: blur(5px) invert(15%)) {
        backdrop-filter: blur(5px) invert(15%);
        ${tw`bg-opacity-25`}
    }
`;

export const Subtitle = styled(BaseSubtitle)`
    ${tw`self-center`}
`;

export const ButtonsContainer = styled(BaseButtonsContainer)`
    ${tw`justify-center w-full`}
`;

export const Button = styled(BaseButton)`
    ${tw`
        border-primary
        bg-primary
        p-1
    `}
    ${(props) => (props.disabled ? 'bg-opacity-25 border-opacity-25' : tw`hover:text-orange-100 hover:text-shadow`)};
`;
