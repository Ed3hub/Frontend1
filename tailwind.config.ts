import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './public/index.html',
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Open Sans', 'sans-serif'],
      },
      fontSize: {
        // Headings
        'h1': ['56px', { lineHeight: '61.6px' }],
        'h2': ['48px', { lineHeight: '52.8px' }],
        'h3': ['40px', { lineHeight: '44px' }],
        'h4': ['32px', { lineHeight: '35.2px' }],
        'h5': ['24px', { lineHeight: '26.4px' }],
        'h6': ['20px', { lineHeight: '22px' }],
        // Body
        'body-lg': ['20px', { lineHeight: '28px' }],
        'body-md': ['18px', { lineHeight: '25.2px' }],
        'body': ['16px', { lineHeight: '22.4px' }],
        'body-sm': ['14px', { lineHeight: '19.6px' }],
      },
      container: {
        center: true,
        padding: '1rem',
        screens: {
          '2xl': '1440px',
          'xl': '1024px',
          'lg': '1024px',
          'md': '768px',
          'sm': '320px',
        },
      },
      // Custom grid system (for reference, use with CSS grid utilities)
      gridTemplateColumns: {
        // Desktop HD & Desktop: 12 columns
        '12': 'repeat(12, minmax(0, 1fr))',
        // Tablet: 6 columns
        '6': 'repeat(6, minmax(0, 1fr))',
        // Mobile: 2 columns
        '2': 'repeat(2, minmax(0, 1fr))',
      },
      gap: {
        'grid': '30px', // Gutter width
      },
    },
  },
  plugins: [],
};

export default config; 