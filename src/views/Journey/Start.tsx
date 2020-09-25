import React, { useEffect } from 'react';

import { Prompt, Redirect, useHistory } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import { useJourneyDispatchers, useJourneyState } from '../../context/JourneyStateContext';
import { useCurrentUser } from '../../context/CurrentUserContext';
import Container from './styledComponents';
import ImageOfTheWorld from '../../components/ImageOfTheWorld';
import SearchBar from '../../components/SearchBar';
import JourneyDisplay from '../../components/JourneyMeter';

const Start = () => {
    const { sellers, searchTerm: term, winner } = useJourneyState();
    const { push } = useHistory();
    const { userLoggedIn } = useCurrentUser();
    const { setSearchTerm } = useJourneyDispatchers();
    const { t } = useTranslation();

    useEffect(() => {
        if (!winner) {
            return;
        }
        push('/journey/finish');
    }, [winner]);

    if (!userLoggedIn) {
        return <Redirect to="/journey" />;
    }

    return (
        <Container>
            <Prompt message={t('journeyExitPrompt')} />
            <SearchBar disabled={Object.keys(sellers ?? {}).length === 0 || Boolean(term)} onSubmit={setSearchTerm} />
            {Object.values(sellers ?? {}).map((seller) => (
                <ImageOfTheWorld seller={seller} key={seller.id} handleError={() => setSearchTerm(null)} />
            ))}
            <JourneyDisplay />
        </Container>
    );
};

export default Start;
