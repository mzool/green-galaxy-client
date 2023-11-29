/** @type {import('tailwindcss').Config} */
export default {

  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './public/**/*.html', // Add additional HTML files
    './content/**/*.md',   // Add Markdown files
  ],

  theme: {
    extend: {
      width:{
        'page':'1200px'
      }
    },
  },
  plugins: [],
}

