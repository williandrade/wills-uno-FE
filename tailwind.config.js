const withMT = require("@material-tailwind/react/utils/withMT");
const colors = require('tailwindcss/colors')

module.exports = withMT({
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        colors: {
            red: {
                50: '#fdf0ef',
                100: '#fbd9d8',
                200: '#f8c0be',
                300: '#f5a7a4',
                400: '#f29491',
                500: '#f0817d',
                600: '#ee7975',
                700: '#ec6e6a',
                800: '#e96460',
                900: '#e5514d',
            },
            yellow: {
                50: '#fef7ec',
                100: '#fcecd1',
                200: '#fadfb2',
                300: '#f8d293',
                400: '#f7c87b',
                500: '#f5be64',
                600: '#f4b85c',
                700: '#f2af52',
                800: '#f0a748',
                900: '#ee9936',
            },
            blue: {
                50: '#efeffe',
                100: '#d6d6fd',
                200: '#bbbbfc',
                300: '#a0a0fa',
                400: '#8b8bf9',
                500: '#7777f8',
                600: '#6f6ff7',
                700: '#6464f6',
                800: '#5a5af5',
                900: '#4747f3',
            },
            green: {
                50: '#f1f7f0',
                100: '#dcead9',
                200: '#c4dcbf',
                300: '#accea5',
                400: '#9bc492',
                500: '#89b97f',
                600: '#81b277',
                700: '#76aa6c',
                800: '#6ca262',
                900: '#59934f',
            },
        },
        extend: {
            colors: {
                stone: colors.warmGray,
                sky: colors.lightBlue,
                neutral: colors.trueGray,
                gray: colors.coolGray,
                slate: colors.blueGray,
            }
        },
    },
    plugins: [],
});