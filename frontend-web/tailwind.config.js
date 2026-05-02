module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1B5E20',
        secondary: '#F9A825',
        accent: '#FAFAFA',
        dark: '#212121',
        info: '#1565C0',
        success: '#1B5E20',
        warning: '#F9A825',
        error: '#C0392B',
        'light-primary': '#E8F5E9',
        'light-secondary': '#FFF8E1',
        'light-info': '#E3F2FD',
        border: '#CCCCCC',
        'bg-light': '#F5F5F5',
      },
      borderRadius: {
        DEFAULT: '12px',
        md: '8px',
        lg: '12px',
      },
      fontFamily: {
        sans: ['Inter', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
