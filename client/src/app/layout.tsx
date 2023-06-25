'use client';

import './globals.css';
import '../styles/loader.css';

import { Providers } from './GlobalRedux/provider';
import { AuthProvider } from '@/context/AuthenticationContext';

export const metadata = {
	icons: {
		icon: './favicon.ico'
	}
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>
				<Providers>
					<AuthProvider>{children}</AuthProvider>
				</Providers>
			</body>
		</html>
	);
}
