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
            transitionDelay: {
                long: "1s",
            },
            keyframes: {
                "curtain-down": {
                    "0%": { transform: "translateY(-120%)" },
                    "50%": { transform: "translateY(10px)" },
                    "100%": { transform: "translateY(0)" },
                },
            },
            animation: {
                "curtain-down": "curtain-down 1000ms ease-in-out 1",
            },
        },
    },
    plugins: [],
};
