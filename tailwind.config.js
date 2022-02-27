module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      white: '#FFFFFF',

      grey: '#545861',
      lightGrey: '#F2F3F4',
      darkGrey: '#262729',

      lightGreen: '#4FCBA6',
      darkGreen: '#009977',

      blue: '#0061C3',
      lightBlue: '#EEF6FC',
      lighterBlue: '#EEF6FC',
      darkBlue: '#1A113E',

      red: '#EE1948',
      darkRed: '#B40021',
    },
    fontSize: {
      xs: '0.75rem', //12px
      sm: '0.875rem', //14px
      base: '1rem', //16px
      lg: '1.125rem', //18px
      xl: '1.25rem', //20px
      '2xl': '1.5rem', //24px
      '2.25xl': '1.625rem', //26
      '2.5xl': '1.75rem', //28px
      '3xl': '1.875rem', //30px
      '4xl': '2.25rem',
      '5xl': '3rem', //48px
      '6xl': '4rem',
      '7xl': '5rem', //80px
    },
    container: {
      center: true,
      padding: '1rem',
    },
    outline: {
      none: ['2px solid transparent', '2px'],
      black: ['1px solid #0061C3', '0px'],
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}