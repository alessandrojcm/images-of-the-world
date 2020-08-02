import React from 'react';
import { render } from 'react-dom';

import App from './App';

import './core/i18n';
import 'tailwindcss/dist/base.min.css';

async function renderApp() {
    if (process.env.NODE_ENV === 'development' || process.env.DEBUG) {
        // eslint-disable-next-line no-console
        console.warn('Running in dev mode, activating error overlay for React.');
        await import('panic-overlay');
        const { ReactQueryDevtools } = await import('react-query-devtools');

        render(
            <>
                <ReactQueryDevtools />
                <App />
            </>,
            document.getElementById('root')
        );
    } else {
        render(<App />, document.getElementById('root'));
    }
}

renderApp();
