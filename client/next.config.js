/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	experimental: {
		appDir: true
	},
	images: {
		domains: ['localhost', 'images.unsplash.com']
	}
};

module.exports = nextConfig;
