/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'robot-wings': "url('/assets/images/robot-wings.png')",
        'image-footer-mob': "url('/assets/images/duck_mob.png')",
        'image-footer-desktop': "url('/assets/images/rd_footer_img.png')",
        'footer-gradient':
          'linear-gradient(90deg, #121212 14.51%, rgba(0, 0, 0, 0) 50.82%, #121212 85.21%)',
        'rectangle-left': "url('/assets/svg/rectangle-left.svg')",
        'rectangle-right': "url('/assets/svg/rectangle-right.svg')",
        'rectangle-mid': "url('/assets/svg/rectangle-mid.svg')",
        'navbar-bg': "url('/assets/svg/navbar-bg.svg')",
      },
      colors: {
        white: '#FFFFFF',
        black: '#000000',
        'text-white': '#FCFDFD',
        background: '#121212',
        title: '#8A8A8A',
        active: '#341DC0',
        'dark-blue': '#2A16A5',
        'main-gray': '#202020', // Header and border in awards
        'secondary-gray': '#292929', // Conclusion background and few lines
        'light-gray': '#404040', // Socials
        'ultra-light-gray': '#5B5B5B',
        orange: '#F44336',
        green: '#108A00',
        yellow: '#FFDE66',
      },
      screens: {
        sm: '320px',
        md: '640px',
        lg: '1200px',
        xl: '1700px',
      },
      fontFamily: {
        jost: ['var(--font-fonts)'],
      },
      spacing: {
        1.5: '0.4rem',
        88: '88px',
        100: '100px',
      },
    },
  },
  plugins: [],
};
