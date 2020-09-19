import React from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

import { Aside, Container } from './StyledComponents';
import JourneyWinner from '../../components/JourneyWinner';
import SellersList from '../../components/SellersList';
import UserCard from '../../components/UserCard';

const JourneyDetails = () => {
    const { id } = useParams<{ id: string }>();
    const { addToast } = useToasts();

    if (!id) {
        addToast('Journey not found', { appearance: 'error' });
        return <Redirect to="/leaderboard" />;
    }

    return (
        <Container>
            <JourneyWinner journeyId={id} />
            <Aside>
                <UserCard journeyId={id} />
                <SellersList journeyId={id} />
            </Aside>
        </Container>
    );
};

export default JourneyDetails;
