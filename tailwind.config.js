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
        fontFamily: {
            display: ['"Kaushan Script"', 'serif'],
            subtitle: ['Andada'],
            body: ['"Alegreya Sans"', 'sans-serif'],
        },
        borderColor: (theme) => ({
            ...theme('colors'),
            default: theme('colors.primary', 'currentColor'),
        }),
        backgroundColor: (theme) => ({
            ...theme('colors'),
            default: theme('colors.primary', 'currentColor'),
        }),
        animations: {
            'slide-down': {
                '0%': {
                    opacity: 0,
                    transform: 'translateY(-10px)',
                },
                '100%': {
                    opacity: 1,
                    transform: 'translateY(0px)',
                },
            },
        },
        extend: {
            transitionDuration: {
                2000: '2000ms',
            },
        },
    },
    variants: {},
    plugins: [require('tailwindcss-animations')],
};
