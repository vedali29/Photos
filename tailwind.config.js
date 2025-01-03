module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gridTemplateRows: {
        'auto-fill': 'minmax(200px, auto)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
