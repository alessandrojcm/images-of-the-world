import React, { useEffect } from 'react';

import { Redirect, useHistory } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

import { useJourneyDispatchers, useJourneyState } from '../../context/JourneyStateContext';
import { useCurrentUser } from '../../context/CurrentUserContext';
import ErrorComponent from '../../components/ErrorComponent';
import Container from './styledComponents';
import ImageOfTheWorld from '../../components/ImageOfTheWorld';
import SearchBar from '../../components/SearchBar';
import JourneyDisplay from '../../components/JourneyMeter';

const Start = () => {
    const { sellers, searchTerm: term, winner } = useJourneyState();
    const { push } = useHistory();
    const { userLoggedIn } = useCurrentUser();
    const { setSearchTerm } = useJourneyDispatchers();

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
            <SearchBar disabled={Object.keys(sellers ?? {}).length === 0 || Boolean(term)} onSubmit={setSearchTerm} />
            <ErrorBoundary FallbackComponent={ErrorComponent} onReset={() => setSearchTerm(null)}>
                {Object.values(sellers ?? {}).map((seller) => (
                    <ImageOfTheWorld seller={seller} key={seller.id} />
                ))}
            </ErrorBoundary>
            <JourneyDisplay />
        </Container>
    );
};

export default Start;
