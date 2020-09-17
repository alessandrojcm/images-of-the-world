import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';

import { Start, Finish } from './Journey';
import MainLayout from '../components/Layout';
import Home from './Home';
import Registration from './Registration';
import LeaderBoard from './Leaderboard/Leaderboard';

import CurrentUserContext, { useCurrentUser } from '../context/CurrentUserContext/CurrentUserContext';
import JourneyContext from '../context/JourneyStateContext';
import Toast from '../components/Toast';

const Journey = () => {
    const { journeyId } = useCurrentUser();
    return (
        <JourneyContext journeyId={journeyId}>
            <Switch>
                <Route path="/journey/start">
                    <Start />
                </Route>
                <Route path="/journey/finish">
                    <Finish />
                </Route>
            </Switch>
        </JourneyContext>
    );
};

const Router: React.FC = () => {
    return (
        <ToastProvider components={{ Toast }} placement="bottom-right">
            <BrowserRouter>
                <MainLayout>
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <CurrentUserContext>
                            <Route exact path="/journey">
                                <Registration />
                            </Route>
                            {/* TODO: lazy loading to this */}
                            <Journey />
                        </CurrentUserContext>
                    </Switch>
                    <Route exact path="/leaderboard">
                        <LeaderBoard />
                    </Route>
                </MainLayout>
            </BrowserRouter>
        </ToastProvider>
    );
};

export default Router;
