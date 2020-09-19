import React from 'react';
import { Route, Switch } from 'react-router-dom';
import loadable from '@loadable/component';

import { useCurrentUser } from '../../context/CurrentUserContext';
import JourneyContext from '../../context/JourneyStateContext';

const LazyStart = loadable(() => import('./Start'));
const LazyFinish = loadable(() => import('./Finish'));

const JourneyRouter = () => {
    const { journeyId } = useCurrentUser();

    return (
        <JourneyContext journeyId={journeyId}>
            <Switch>
                <Route path="/journey/start">
                    <LazyStart />
                </Route>
                <Route path="/journey/finish">
                    <LazyFinish />
                </Route>
            </Switch>
        </JourneyContext>
    );
};

export default JourneyRouter;
