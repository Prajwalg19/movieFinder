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
                clashBold: ['clash-display-bold', 'sans-serif'],
                clashRegular: ['clash-display-regular', 'sans-serif'],
                clashMedium: ['clash-display-medium', 'sans-serif'],
                clashSemiBold: ['clash-display-semibold', 'sans-serif']
            },
        },
    },
    plugins: [
        flowbite.plugin(),
    ],
}
