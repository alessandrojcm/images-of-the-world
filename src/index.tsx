import React from 'react';
import { render } from 'react-dom';
import 'panic-overlay';

import App from './App';

import './core/i18n';
import 'tailwindcss/dist/base.min.css';

render(<App />, document.getElementById('root'));
