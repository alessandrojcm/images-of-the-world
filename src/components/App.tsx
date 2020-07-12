import tw from 'twin.macro';
import React from 'react';

const GreenDiv = tw.div`text-green-500 text-3xl`;

const App: React.FC = () => {
    return <GreenDiv>Hello!</GreenDiv>;
};

export default App;
