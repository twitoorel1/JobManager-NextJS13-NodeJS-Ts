/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/features/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/**/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}'
	],
	theme: {
		extend: {
			color: {
				'dark-purple': '#081A51',
				'light-purple': 'rgba(255, 255, 255, 0.18)'
			},
			maxWidth: {
				270: '67.5rem'
			},
			fontSize: {
				'title-md2': ['26px', '30px']
			},
			boxShadow: {
				default: '0px 8px 13px -3px rgba(0, 0, 0, 0.07)'
			},
			spacing: {
				5.5: '1.375rem'
			}
		}
	},
	plugins: [require('@tailwindcss/forms')]
};
