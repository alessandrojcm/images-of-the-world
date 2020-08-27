import React, { useEffect } from 'react';

import { Redirect, useHistory } from 'react-router-dom';

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
    const { searchTerm } = useJourneyDispatchers();

    useEffect(() => {
        if (!winner) {
            return;
        }
        push('/journey/finish');
    }, [winner]);

    if (!userLoggedIn) {
        return <Redirect to="/journey" />;
    }

    // TODO: ImageOfTheWorld should fetch its seller by id
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

export default Start;
