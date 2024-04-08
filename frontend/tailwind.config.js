/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: "class",
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		colors: {
			transparent: "transparent",
			current: "currentColor",
			white: {
				100: "#ffffff69",
				200: "#eeeeee",
				300: "#7c7c7c",
				400: "#f6feff",
				900: "#ffffff",
			},

			blue: {
				100: "#a6c8ff",
				200: "#7fb8ff",
				300: "#589fff",
				400: "#2f8bf5",
				500: "#0066cc",
				600: "#005cb3",
				700: "#005299",
				800: "#004880",
				900: "#003d66",
			  },
			  gray: {
				100: "#f0f0f0",
				200: "#d9d9d9",
				300: "#bfbfbf",
				400: "#a6a6a6",
				500: "#8c8c8c",
				600: "#737373",
				700: "#595959",
				800: "#404040",
				900: "#262626",
			  },
			  
			lightblue: "#ADD8E6",
			purple: "#3f3cbb",
			violet: { 100: "#5f43b2", 900: "#902bf5" },
			midnight: "#13193a",
			metal: "#4261f1",
			tahiti: "#3ab7bf",
			silver: "#c7c7d0",
			bermuda: "#78dcca",
			black: "#000",
			red: "#dd112e",
			blood: "#de2c2c",
			green: "#09c360",
			yellow: "#ff0",
			white: "#FFFFFF",
			yellowX: "#e2b100",
			paleturquoise:"#AFEEEE",
			'custom-green': '#5f6f52',
			'pastel-green': '#95A386',
			'nav-gray':'#E0DDD7',
			'white-gray':'#fefcf7',
			'pro-white':'#eaeaea',
			gray: {
				bg: "#181a1b",
				darkest: "#1f2d3d",
				dark: "#3c4858",
				DEFAULT: "#1a1a1a",
				light: "#e0e6ed",
				lightest: "#f9fafc",
			},
		},

		extend: {
			dropShadow: {
				"dark-lg": "0 0 3px #30375d",
				"dark-2xl": "0 0 25px #1e254a",
			},
			shadow: {
				"dark-lg": "0 0 25px #1e254a",
			},
			
		},
		
	},
	plugins: [],
};