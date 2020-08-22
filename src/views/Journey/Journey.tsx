import React from 'react';

import { Redirect } from 'react-router-dom';
import { useJourneyDispatchers, useJourneyState } from '../../context/JourneyStateContext';

import { useCurrentUser } from '../../context/CurrentUserContext';
import Container from './styledComponents';
import ImageOfTheWorld from '../../components/ImageOfTheWorld';
import SearchBar from '../../components/SearchBar';
import JourneyDisplay from '../../components/JourneyMeter';

const Journey = () => {
    const { sellers, searchTerm: term } = useJourneyState();
    const { userLoggedIn } = useCurrentUser();
    const { searchTerm } = useJourneyDispatchers();

    if (!userLoggedIn) {
        return <Redirect to="/journey" />;
    }

    return (
        <Container>
            <SearchBar disabled={Object.keys(sellers).length === 0 || Boolean(term)} onSubmit={searchTerm} />
            {Object.values(sellers).map((seller) => (
                <ImageOfTheWorld seller={seller} key={seller.id} />
            ))}
            <JourneyDisplay />
        </Container>
    );
};

export default Journey;
