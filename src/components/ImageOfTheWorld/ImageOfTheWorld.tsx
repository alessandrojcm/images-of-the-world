import React from 'react';

import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { css } from 'twin.macro';
import { useErrorHandler } from 'react-error-boundary';
import { IImageOfTheWorld } from '~types/models';

import { Details, Section } from './StyledComponents';
import { useJourneyDispatchers, useJourneyState } from '../../context/JourneyStateContext';
import { getJourneySeller } from '../../core/apis/iotwApi';
import useRandomImage from '../../utils/hooks/useRandomImage';
import useMatchMedia from '../../utils/hooks/useProgressiveImage/useMatchMedia';
import Picture from '../Picture';

const ImageOfTheWorld: React.FC<IImageOfTheWorld & { className?: string }> = (props) => {
    const { seller: initialCache, className = '' } = props;

    const [first] = useMatchMedia('(min-width: 640px)', '(min-width: 768px)', '(min-width: 1024px)', '(min-width: 1280px)');
    const { t } = useTranslation();
    const handleError = useErrorHandler();
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
    const { photo } = useRandomImage(searchTerm, (seller ?? { id: '' }).id, handleError);

    return (
        <Section className={className}>
            <Picture
                photo={photo}
                width={first}
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
