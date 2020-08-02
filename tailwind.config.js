const red = '#AA1D4E';
const yellow = '#CDC569';
const orange200 = '#DCD3B6';

module.exports = {
    purge: ['./src/**/*.html', './src/**/*.{j,t}sx'],
    theme: {
        textShadow: {
            default: '0 2px 5px rgba(0, 0, 0, 0.5)',
        },
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
        zIndex: {
            '-10': '-10',
        },
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
    plugins: [require('tailwindcss-animations'), require('tailwindcss-typography')],
};
