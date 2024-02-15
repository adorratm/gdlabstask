/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // or 'media' or 'class'
  mode: 'jit',
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#5150a3",
          "secondary": "#00b600",
          "accent": "#00d500",
          "neutral": "#170c1f",
          "base-100": "#ffffff",
          "base-200": "#f5f6fa",
          "info": "#0083aa",
          "success": "#00c096",
          "warning": "#966b00",
          "error": "#f66564",
        },
      },
    ]
  },
}

