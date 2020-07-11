import React from 'react';
import ReactDOM from 'react-dom';
import 'tailwindcss/dist/base.min.css';
import tw from 'twin.macro';

const GreenDiv = tw.div`text-blue-500 text-3xl`;

const App = () => {
    return <GreenDiv>Hello!</GreenDiv>;
};

ReactDOM.render(<App />, document.getElementById('root'));
