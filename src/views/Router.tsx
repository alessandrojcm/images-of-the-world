import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import MainLayout from '../components/Layout';
import Home from './Home';

const Router: React.FC = () => {
    return (
        <BrowserRouter>
            <MainLayout>
                <Route path="/">
                    <Home />
                </Route>
            </MainLayout>
        </BrowserRouter>
    );
};

export default Router;
