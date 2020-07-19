import React from 'react';
import { render } from 'react-dom';

import App from './App';
import 'panic-overlay';

import './core/i18n';
import 'tailwindcss/dist/base.min.css';

render(<App />, document.getElementById('root'));
