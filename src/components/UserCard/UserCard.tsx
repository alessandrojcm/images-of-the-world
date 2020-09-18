import React from 'react';
import { useQuery } from 'react-query';
import { pluck } from 'rxjs/operators';

import { getJourneyState } from '../../core/apis/iotwApi';

// TODO: Error boundary
const UserCard: React.FC<{ journeyId: string }> = (props) => {
    const { journeyId } = props;

    const { data, isLoading } = useQuery([`${journeyId}-user`, { journeyId }], (_: string, { journeyId: jid }) => {
        return getJourneyState(jid).pipe(pluck('user')).toPromise();
    });

    if (isLoading) {
        return <p>Loading...</p>;
    }
    // TODO: i18n
    return (
        <div>
            <p>Journey user</p>
            <p>{data?.name}</p>
            {data?.lastName}
            {data?.email}
        </div>
    );
};

export default UserCard;
