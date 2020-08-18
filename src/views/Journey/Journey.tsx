import React from 'react';

import { Redirect } from 'react-router-dom';
import { useJourneyState } from '../../context/JourneyStateContext';

import Container from './styledComponents';
import ImageOfTheWorld from '../../components/ImageOfTheWorld';
import { useCurrentUser } from '../../context/CurrentUserContext';

const Journey = () => {
    const { sellers } = useJourneyState();
    const { userLoggedIn } = useCurrentUser();

    if (!userLoggedIn) {
        return <Redirect to="/journey" />;
    }

    return (
        <Container>
            {Object.values(sellers).map((seller) => (
                <ImageOfTheWorld seller={seller} key={seller.id} />
            ))}
        </Container>
    );
};

export default Journey;
