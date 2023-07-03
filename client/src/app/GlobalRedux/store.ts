'use client';

import { configureStore } from '@reduxjs/toolkit';
import authSlice from '@/features/authentication/redux/authSlice';
import userSlice from '@/features/user/redux/userSlice';
import clientSlice from '@/features/client/redux/clientSlice';

export const store = configureStore({
	reducer: {
		auth: authSlice,
		user: userSlice,
		client: clientSlice
	}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
