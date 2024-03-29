const plugin = require("tailwindcss/plugin");

const rotateX = plugin(function ({ addUtilities }) {
  addUtilities({
    ".rotate-x-45": {
      transform: "rotateX(45deg)",
    },
    ".rotate-x-90": {
      transform: "rotateX(90deg)",
    },
    ".rotate-x-135": {
      transform: "rotateX(135deg)",
    },
    ".rotate-x-180": {
      transform: "rotateX(180deg)",
    },
  });
});

module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  darkMode: "class",
  safelist: [{ pattern: /.*/ }],
  theme: {
    fontFamily: {
      hind: "var(--ff-inter)",
    },
    screens: {
      xxs: "380px",
      xs: "440px",
      sm: "575px",
      md: "768px",
      lg: "990px",
      xl: "1200px",
      "2xl": "1420px", // this is the "design resolution"
    },
    fontSize: {
      xs: "0.525rem",
      sm: "0.875rem",
      lg: "1.125rem",      
      xl: "1.375rem", // 22px
      "2xl": "1.5625rem", // 25px
      "3xl": "1.875rem", // 30px
      "4xl": "2.5rem", // 40px
      "5xl": "3.125rem", // 50px
      "6xl": "3.75rem", // 60px
      "7xl": "4.375rem", // 70px
      display: "var(--fs-display)",
      h1: "var(--fs-headline-1)",
      h2: "var(--fs-headline-2)",
      h3: "var(--fs-headline-3)",
      h4: "var(--fs-headline-4)",
      h5: "var(--fs-headline-5)",
      h6: "var(--fs-headline-6)",
      "lead-1": "var(--fs-lead-1)",
      "lead-2": "var(--fs-lead-2)",
      "body-lg": "var(--fs-body-lg)",
      "body-md": "var(--fs-body-md)",
      "body-sm": "var(--fs-body-sm)",
      caption: "var(--fs-caption)",
      tiny: "var(--fs-tiny)",
    },
    fontWeight: {
      light: "var(--fw-light)",
      regular: "var(--fw-regular)",
      medium: "var(--fw-medium)",
      semibold: "var(--fw-semibold)",
      bold: "var(--fw-bold)",
      extrabold: "var(--fw-extrabold)"
    },
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        bgColor: "var(--bg-color)",
        one: "var(--color-1)",
        two: "var(--color-2)",
        three: "var(--color-3)",
        four: "var(--color-4)",
        five: "var(--color-5)",
        six: "var(--color-6)",
        seven: "var(--color-7)",
        eight: "var(--color-8)",
        nine: "var(--color-9)",
        ten: "var(--color-10)",
        primary: {
          50: "var(--primary-50)",
          100: "var(--primary-100)",
          200: "var(--primary-200)",
          300: "var(--primary-300)",
          400: "var(--primary-400)",
          500: "var(--primary-500)",
          600: "var(--primary-600)",
          700: "var(--primary-700)",
          800: "var(--primary-800)",
          900: "var(--primary-900)",
        },
        neutral: {
          100: "var(--neutral-100)",
          200: "var(--neutral-200)",
          300: "var(--neutral-300)",
          400: "var(--neutral-400)",
          500: "var(--neutral-500)",
          600: "var(--neutral-600)",
          700: "var(--neutral-700)",
          800: "var(--neutral-800)",
          900: "var(--neutral-900)",
        },
        blue: {
          100: "var(--blue-100)",
          200: "var(--blue-200)",
          300: "var(--blue-300)",
          400: "var(--blue-400)",
          500: "var(--blue-500)",
          600: "var(--blue-600)",
          700: "var(--blue-700)",
          800: "var(--blue-800)",
          900: "var(--blue-900)",
        },
        green: {
          100: "var(--green-100)",
          200: "var(--green-200)",
          300: "var(--green-300)",
          400: "var(--green-400)",
          500: "var(--green-500)",
          600: "var(--green-600)",
          700: "var(--green-700)",
          800: "var(--green-800)",
          900: "var(--green-900)",
        },
        red: {
          100: "var(--red-100)",
          200: "var(--red-200)",
          300: "var(--red-300)",
          400: "var(--red-400)",
          500: "var(--red-500)",
          600: "var(--red-600)",
          700: "var(--red-700)",
          800: "var(--red-800)",
          900: "var(--red-900)",
        },
        yellow: {
          100: "var(--yellow-100)",
          200: "var(--yellow-200)",
          300: "var(--yellow-300)",
          400: "var(--yellow-400)",
          500: "var(--yellow-500)",
          600: "var(--yellow-600)",
          700: "var(--yellow-700)",
          800: "var(--yellow-800)",
          900: "var(--yellow-900)",
        },
      },
      width: {
        checkbox: "var(--checkbox-size)",
      },
      height: {
        checkbox: "var(--checkbox-size)",
      },
      lineHeight: {
        tight: "var(--lh-tight)",
        base: "var(--lh-base)",
      },
      zIndex: {
        negative: "var(--z-negative)",
        elevate: "var(--z-elevate)",
        sticky: "var(--z-sticky)",
        drawer: "var(--z-drawer)",
        dropdown: "var(--z-dropdown)",
        modal: "var(--z-modal)",
        popover: "var(--z-popover)",
        maximum: "var(--z-maximum)",
      },
      animation: {
        ripple: "ripple 0.6s linear",
      },
      keyframes: {
        ripple: {
          "0%": {
            transform: "scale(0)",
            opacity: "0.4",
          },
          "100%": {
            transform: "scale(3)",
            opacity: "0",
          },
        },
      },
    },
  },
  plugins: [
    rotateX,
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/typography"),
  ],
};
