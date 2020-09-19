import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';
import loadable from '@loadable/component';
import MainLayout from '../components/Layout';
import Home from './Home';

import CurrentUserContext from '../context/CurrentUserContext/CurrentUserContext';
import Toast from '../components/Toast';

const LazyDetails = loadable(() => import('./JourneyDetails'));
const LazyLeaderBoard = loadable(() => import('./Leaderboard'));
const LazyRegistration = loadable(() => import('./Registration'));
const LazyJourney = loadable(() => import('./Journey'));

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
                                <LazyRegistration />
                            </Route>
                            <LazyJourney />
                        </CurrentUserContext>
                    </Switch>
                    <Route exact path="/leaderboard">
                        <LazyLeaderBoard />
                    </Route>
                    <Route exact path="/leaderboard/:id">
                        <LazyDetails />
                    </Route>
                </MainLayout>
            </BrowserRouter>
        </ToastProvider>
    );
};

export default Router;
