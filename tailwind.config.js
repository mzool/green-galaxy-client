/** @type {import('tailwindcss').Config} */
export default {

  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './public/**/*.html', // Add additional HTML files
    './content/**/*.md',   // Add Markdown files
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],

  theme: {
    extend: {
      width: {
        'page': '1200px'
      },
    },
  }, corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    import('@tailwindcss/aspect-ratio'),
    import('flowbite/plugin'),
  ],
}

