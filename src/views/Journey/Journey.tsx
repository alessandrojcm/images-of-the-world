import React from 'react';

import { Redirect } from 'react-router-dom';
import { useJourneyDispatchers, useJourneyState } from '../../context/JourneyStateContext';

import { useCurrentUser } from '../../context/CurrentUserContext';
import Container from './styledComponents';
import ImageOfTheWorld from '../../components/ImageOfTheWorld';
import SearchBar from '../../components/SearchBar';

const Journey = () => {
    const { sellers } = useJourneyState();
    const { userLoggedIn } = useCurrentUser();
    const { searchTerm } = useJourneyDispatchers();

    if (!userLoggedIn) {
        return <Redirect to="/journey" />;
    }

    return (
        <Container>
            <SearchBar disabled={Object.keys(sellers).length === 0} onSubmit={searchTerm} />
            {Object.values(sellers).map((seller) => (
                <ImageOfTheWorld seller={seller} key={seller.id} />
            ))}
        </Container>
    );
};

export default Journey;
