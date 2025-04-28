/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        zWhite: '#FFFFFF',
        zYellow: '#FFA800',
        zBlack: '#000000',
        zDarkGray: '#1A1A1A',
        zLightGray: '#CCCCCC',
        zChatGreyMedium: '#252525',
        zChatGreyLeft: '#151515',
        zChatGreyInput: '#3D3D3D',
      },
    },
  },
  plugins: [],
};
