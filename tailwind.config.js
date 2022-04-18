module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    fontFamily: {
      hind: "var(--ff-hind)",
    },
    fontSize: {
      display: "var(--fs-display)",
      "headline-1": "var(--fs-headline-1)",
      "headline-2": "var(--fs-headline-2)",
      "headline-3": "var(--fs-headline-3)",
      "headline-4": "var(--fs-headline-4)",
      "headline-5": "var(--fs-headline-5)",
      "headline-6": "var(--fs-headline-6)",
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
    },
    extend: {
      colors: {
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
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/typography"),
  ],
};
