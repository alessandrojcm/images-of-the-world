import React from 'react';
import { render } from 'react-dom';

import App from './App';
import 'panic-overlay';

import './core/i18n';
import 'tailwindcss/dist/base.min.css';

async function renderApp() {
  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    console.warn('Running in dev mode, activating error overlay for React.');
    await import('panic-overlay');
  }
  render(<App />, document.getElementById('root'));
}

renderApp();
