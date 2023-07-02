'use client';

import { ReactNode, createContext, lazy, useContext, useEffect, useMemo } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { isLoginByToken } from '@/features/authentication/redux/authSlice';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { AuthState, RootState } from '@/types/global';
import { getCookie, removeCookie } from '@/utils/cookies';
import useLoader from '@/hooks/useLoader';

const Loader = lazy(() => import('@/components/common/Loader'));

type AuthContextValue = {
	isAuthenticated: boolean;
	isLoading: boolean;
	isSending: boolean;
	user: any;
};

type AuthContextProps = {
	children?: ReactNode;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuthContext() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuthContext must be used within an AuthProvider');
	}
	return context;
}

export function AuthProvider({ children }: AuthContextProps) {
	const isLoadingSpinner = useLoader(2000);
	const dispatch: ThunkDispatch<{}, {}, AnyAction> = useDispatch();
	const router = useRouter();
	const pathname = usePathname();
	const { isAuthenticated, user, isError, isTokenChecked, isLoading, isSending } = useSelector((state: RootState) => state.auth);

	// useEffect(() => {
	// 	setTimeout(() => {
	// 		removeCookie('ac-token');
	// 		removeCookie('userId');
	// 		if (user === null) {
	// 			router.push('/login');
	// 		}
	// 	}, 1000);
	// }, []);


	useEffect(() => {
		if (getCookie('ac-token')) {
			dispatch(isLoginByToken());
		}
	}, []);

	useEffect(() => {
		if ((isAuthenticated === false && pathname === '/login') || pathname === '/') {
			router.push('/login');
		}
	}, [isAuthenticated, isError, router]);

	const authContextValue = useMemo(() => ({ isAuthenticated, user, isLoading, isSending }), [isAuthenticated, user, isLoading, isSending]);
	return <AuthContext.Provider value={authContextValue}>{isLoadingSpinner ? <Loader /> : children}</AuthContext.Provider>;
}

export function useAuth() {
	return useContext(AuthContext);
}
