import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Start, Finish } from './Journey';
import MainLayout from '../components/Layout';
import Home from './Home';
import Registration from './Registration';

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
                                    <Start />
                                </Route>
                                <Route path="/journey/finish">
                                    <Finish />
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
