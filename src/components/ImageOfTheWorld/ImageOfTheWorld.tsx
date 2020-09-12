import React from 'react';

import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { css } from 'twin.macro';
import { IImageOfTheWorld } from '~types/models';

import { Details, Loader, Section } from './StyledComponents';
import { useJourneyDispatchers, useJourneyState } from '../../context/JourneyStateContext';
import useRandomImage from '../../utils/hooks/useRandomImage';
import Picture from '../Picture';
import { getJourneySeller } from '../../core/apis/iotwApi';

// TODO: figure placeholder for when searchTerm is null
const ImageOfTheWorld: React.FC<IImageOfTheWorld & { className?: string }> = (props) => {
    const { seller: initialCache, className = '' } = props;

    const { t } = useTranslation();
    const { searchTerm, id: journeyId } = useJourneyState();
    const { imageChosen } = useJourneyDispatchers();
    const { data: seller } = useQuery(
        initialCache.id,
        (id: string) => {
            return getJourneySeller(journeyId as string, id).toPromise();
        },
        {
            enabled: Boolean(journeyId) && Boolean(initialCache.id),
            initialData: initialCache,
        }
    );

    // Type inference complaints because seller can be undefined, it actually
    // will never be undefined since we are passing initialCache and the query
    // is not enabled until seller it's defined
    const { isLoading, photo } = useRandomImage(searchTerm, (seller ?? { id: '' }).id);

    if (isLoading || !photo) {
        return (
            <Section className={className}>
                <Loader />
                <Details>
                    <summary>{t('sellerImage', { val: (seller ?? { id: '' }).sellerName })}</summary>
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
                onClick={(photoId) => imageChosen((seller ?? { id: '' }).id, photoId)}
            />
            <Details>
                <p>{t('sellerImage', { val: (seller ?? { id: '' }).sellerName })}</p>
            </Details>
        </Section>
    );
};

export default ImageOfTheWorld;
