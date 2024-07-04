const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: '640px',   // min-width: 640px
      md: '768px',   // min-width: 768px
      lg: '1024px',  // min-width: 1024px
      xl: '1280px',  // min-width: 1280px
      '2xl': '1536px', // min-width: 1536px
    },
 
    extend: {
    },
  },
  plugins: [],
});
