'use client';

import { Provider } from 'react-redux';
import { store } from './store';
import { LayoutProps } from '@/types/global';

export function Providers({ children }: LayoutProps) {
	return <Provider store={store}>{children}</Provider>;
}
