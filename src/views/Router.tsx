import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import MainLayout from '../components/Layout';
import Home from './Home';
import Registration from './Registration';

import CurrentUserContext from '../context/CurrentUserContext/CurrentUserContext';

const Router: React.FC = () => {
    return (
        <BrowserRouter>
            <MainLayout>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/journey">
                    <CurrentUserContext>
                        <Registration />
                    </CurrentUserContext>
                </Route>
            </MainLayout>
        </BrowserRouter>
    );
};

export default Router;
