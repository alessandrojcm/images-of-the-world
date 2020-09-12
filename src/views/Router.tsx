import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Start, Finish } from './Journey';
import MainLayout from '../components/Layout';
import Home from './Home';
import Registration from './Registration';

import CurrentUserContext, { useCurrentUser } from '../context/CurrentUserContext/CurrentUserContext';
import JourneyContext from '../context/JourneyStateContext';

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
            </MainLayout>
        </BrowserRouter>
    );
};

export default Router;
