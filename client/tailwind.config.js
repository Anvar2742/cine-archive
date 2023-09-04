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
                "sm-custom": "0px 1px 20px -3px #FFFFFF",
                "xs-custom": "0px 3px 10px -7px #FFFFFF",
            },
            backgroundImage: {
                hero: "url('/img/hero-bg.png')",
                sliderGrad:
                    "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(0,0,0,.8) 100%)",
                blurred:
                    "radial-gradient(1877.04% 167.98% at -23.29% -16.67%, rgba(84, 148, 216, 0.24) 0%, rgba(255, 255, 255, 0.24) 100%)",
                cyan: "linear-gradient(265deg, #3F377F -36.05%, #43A8D4 140.05%)",
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
                underline:
                    "underline 1500ms ease 0ms 1 normal forwards running",
            },
            fontFamily: {
                noto: ["Noto Sans", "sans-serif"],
            },
            transitionProperty: {
                font: "font-size",
            },
        },
    },
    plugins: [],
};
