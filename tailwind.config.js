module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gridTemplateRows: {
        'auto-fill': 'minmax(200px, auto)',
      },
      keyframes: {
        one: {
          '0%': { boxShadow: '0 0 250px 20px #473C78' },
          '100%': { boxShadow: '0 0 100px 15px #F72A3B' },
        },
        two: {
          '0%': { boxShadow: '0 0 250px 20px #18C499' },
          '100%': { boxShadow: '0 0 100px 15px #D8F05E' },
        },
        three: {
          '0%': { boxShadow: '0 0 250px 20px #FFDD00' },
          '100%': { boxShadow: '0 0 100px 15px #3E33FF' },
        },
        four: {
          '0%': { boxShadow: '0 0 250px 20px #781848' },
          '100%': { boxShadow: '0 0 100px 15px #F2BBE9' },
        },
        five: {
          '0%': { boxShadow: '0 0 250px 20px #42F2A1' },
          '100%': { boxShadow: '0 0 100px 15px #F4F6AD' },
        },
      },
      animation: {
        one: 'one 5s ease-in-out infinite alternate',
        two: 'two 4s ease-in-out infinite alternate',
        three: 'three 3s ease-in-out infinite alternate',
        four: 'four 2s ease-in-out infinite alternate',
        five: 'five 1s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
