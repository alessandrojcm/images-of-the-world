import React from 'react';

import { useTranslation } from 'react-i18next';
import { css } from 'twin.macro';
import { IImageOfTheWorld } from '~types/models';

import { Details, Section, Loader } from './StyledComponents';
import { useJourneyDispatchers, useJourneyState } from '../../context/JourneyStateContext';
import useRandomImage from '../../utils/hooks/useRandomImage';
import Picture from '../Picture';

// TODO: figure placeholder for when searchTerm is null
const ImageOfTheWorld: React.FC<IImageOfTheWorld & { className?: string }> = (props) => {
    const { seller, className = '' } = props;

    const { t } = useTranslation();
    const { searchTerm } = useJourneyState();
    const { imageChosen } = useJourneyDispatchers();
    const { isLoading, photo } = useRandomImage(searchTerm, seller.id);

    if (isLoading) {
        return (
            <Section className={className}>
                <Loader />
                <Details>
                    <summary>{t('sellerImage', { val: seller.sellerName })}</summary>
                    <p>{t('pointsToWin', { v1: seller.points, v2: 20 })}</p>
                </Details>
            </Section>
        );
    }

    return (
        <Section className={className}>
            <Picture
                photo={photo}
                width={512}
                css={css`
                    min-height: 256px;
                `}
                onClick={(photoId) => imageChosen(seller.id, photoId)}
            />
            <Details>
                <p>{t('sellerImage', { val: seller.sellerName })}</p>
            </Details>
        </Section>
    );
};

export default ImageOfTheWorld;
