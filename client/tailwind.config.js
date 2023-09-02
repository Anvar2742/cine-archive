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
                sliderGrad:
                    "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(0,0,0,.8) 100%)",
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
                    "50%": { transform: "translateY(50px)" },
                    "100%": { transform: "translateY(0)" },
                },
                underline: {
                    "0%": { width: "0" },
                    "100%": { width: "100%" },
                },
            },
            animation: {
                "curtain-down": "curtain-down 1000ms ease-in-out 1",
                // underline: "underline 1000ms ease-in-out 10",
                underline:
                    "underline 1500ms ease 0ms 1 normal forwards running",
            },
        },
    },
    plugins: [],
};
