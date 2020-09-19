const red = '#AA1D4E';
const yellow = '#CDC569';
const orange200 = '#DCD3B6';
const green = '#41660B';
const gold = '#CDC569';

module.exports = {
    purge: ['./src/**/*.html', './src/**/*.{j,t}sx'],
    theme: {
        textShadow: {
            default: '0 2px 5px rgba(0, 0, 0, 0.5)',
            white: '0 2px 5px rgba(220, 211, 182, 0.5)',
        },
        colors: {
            primary: red,
            secondary: yellow,
            neutral: orange200,
            red,
            yellow,
            green,
            gold,
            orange: {
                100: '#EEEEE3',
                200: orange200,
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
            transparent: 'rgba(0,0,0,0)',
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
            gridRowEnd: {
                finish: '-1',
            },
            maxHeight: {
                '40vh': '40vh',
            },
            minHeight: {
                '40vh': '40vh',
            },
            width: {
                '1/2-screen': '50vw',
            },
            height: {
                '1/2': '50%',
            },
        },
    },
    variants: { borderColor: ['responsive', 'hover', 'focus', 'active', 'disabled'] },
    // eslint-disable-next-line
    plugins: [require('tailwindcss-typography')],
};
