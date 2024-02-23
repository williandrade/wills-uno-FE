const withMT = require("@material-tailwind/react/utils/withMT");
const colors = require('tailwindcss/colors')

module.exports = withMT({
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
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