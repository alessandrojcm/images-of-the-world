import React from 'react';
import { render } from 'react-dom';

// @ts-ignore
// eslint-disable-next-line import/no-extraneous-dependencies
import { loadPerEnv } from 'perenv.macro';

import App from './App';

import './core/i18n';
import 'tailwindcss/dist/base.min.css';

loadPerEnv('panic-overlay', 'NODE_ENV', 'development');
loadPerEnv('./dev-tools', 'NODE_ENV', 'development');

render(<App />, document.getElementById('root'));
