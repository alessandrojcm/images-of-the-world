import React from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

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
        <div>
            <JourneyWinner journeyId={id} />
            <SellersList journeyId={id} />
            <UserCard journeyId={id} />
        </div>
    );
};

export default JourneyDetails;
