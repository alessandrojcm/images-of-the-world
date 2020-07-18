import React, { Suspense } from 'react';
import FullPageLoader from './components/FullPageLoader';
import Router from './views/Router';

const App: React.FC = () => {
    return (
        <Suspense fallback={<FullPageLoader />}>
            <Router />
        </Suspense>
    );
};

export default App;
