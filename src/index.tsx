import React from 'react';
import { render } from 'react-dom';
import tw from 'twin.macro';

import 'tailwindcss/dist/base.min.css';

const GreenDiv = tw.div`text-green-500 text-3xl`;

const App: React.FC = () => {
    return <GreenDiv>Hello!</GreenDiv>;
};

render(<App />, document.getElementById('root'));
