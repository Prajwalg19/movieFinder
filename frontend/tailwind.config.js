/** @type {import('tailwindcss').Config} */
import * as flowbite from "flowbite-react/tailwind"
export default {
    darkMode: 'selector',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        flowbite.content(),
    ],
    theme: {
        extend: {
            fontFamily: {
                clashLight: ['clash-display-light', 'sans-serif'],
                clashRegular: ['clash-display-regular', 'sans-serif'],
                clashBold: ['clash-display-bold', 'sans-serif'],
                clashSemiBold: ['clash-display-semibold', 'sans-serif']
            },
        },
    },
    plugins: [
        flowbite.plugin(),
    ],
}
