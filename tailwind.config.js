const red = '#AA1D4E';
const yellow = '#CDC569';
const orange200 = '#DCD3B6';

module.exports = {
    purge: ['./src/**/*.html', './src/**/*.{j,t}sx'],
    theme: {
        colors: {
            primary: red,
            secondary: yellow,
            neutral: orange200,
            red,
            yellow,
            orange: {
                '100': '#EEEEE3',
                '200': orange200,
            },
            black: '#223E3F',
        },
        extend: {},
    },
    variants: {},
    plugins: [],
};
