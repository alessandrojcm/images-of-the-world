import React, { Suspense } from 'react';
import { render } from 'react-dom';

import App from './App';
import FullPageLoader from './components/FullPageLoader';

import './core/i18n';
import 'tailwindcss/dist/base.min.css';

render(
    <Suspense fallback={<FullPageLoader />}>
        <App />
    </Suspense>,
    document.getElementById('root')
);
