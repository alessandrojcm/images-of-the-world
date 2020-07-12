import React from 'react';
import { render } from 'react-dom';
import 'tailwindcss/dist/base.min.css';
/*const GreenDiv = tw.div`
    text-blue-500 text-3xl
`;*/
var App = function () {
    return React.createElement("p", null, "'a'");
};
render(React.createElement(App, null), document.getElementById('root'));
//# sourceMappingURL=index.js.map