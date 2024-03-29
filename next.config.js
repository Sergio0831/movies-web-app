/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  images: {
    deviceSizes: [560, 768, 1440]
  },
  plugins:
    process.env.NODE_ENV === 'production'
      ? [
          'postcss-flexbugs-fixes',
          [
            'postcss-preset-env',
            {
              autoprefixer: {
                flexbox: 'no-2009'
              },
              stage: 3,
              features: {
                'custom-properties': false
              }
            }
          ],
          [
            '@fullhuman/postcss-purgecss',
            {
              content: [
                './pages/**/*.{js,jsx,ts,tsx}',
                './components/**/*.{js,jsx,ts,tsx}'
              ],
              defaultExtractor: (content) =>
                content.match(/[\w-/:]+(?<!:)/g) || [],
              safelist: ['html', 'body']
            }
          ]
        ]
      : []
};

