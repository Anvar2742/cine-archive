/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./*.html"],
    theme: {
        extend: {
            colors: {
                primary: "#19191B",
                sec: "#5454D4",
            },
            boxShadow: {
                header: "0px 1px 20px -3px #FFFFFF",
            },
            backgroundImage: {
                hero: "url('/img/hero-bg.png')",
            },
            screens: {
                phone: "420px",
            },
        },
    },
    plugins: [],
};
