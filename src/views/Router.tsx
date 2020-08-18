import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import MainLayout from '../components/Layout';
import Home from './Home';
import Registration from './Registration';
import Journey from './Journey';

import CurrentUserContext from '../context/CurrentUserContext/CurrentUserContext';
import JourneyContext from '../context/JourneyStateContext';

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
                        <JourneyContext>
                            <Switch>
                                <Route path="/journey/start">
                                    <Journey />
                                </Route>
                            </Switch>
                        </JourneyContext>
                    </CurrentUserContext>
                </Switch>
            </MainLayout>
        </BrowserRouter>
    );
};

export default Router;
