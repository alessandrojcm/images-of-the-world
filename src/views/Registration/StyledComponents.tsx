import tw, { styled } from 'twin.macro';

import { Subtitle as BaseSubtitle } from '../../components/Typography';
import { ButtonsContainer as BaseButtonsContainer } from '../../components/Form';

export const Subtitle = styled(BaseSubtitle)`
    ${tw`self-center`}
`;

export const ButtonsContainer = styled(BaseButtonsContainer)`
    ${tw`justify-center w-full`}
`;
