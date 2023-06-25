import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { UserState } from '@/types/global';
import { editPassword, updateUser, updateImageProfile } from '../services/user.service';
import { UpdatePasswordSuccess, UpdateProfileSuccess } from '@/constants/lang';

export const editPasswordByUserId = createAsyncThunk('user/editPasswordByUserId', async (formValue: object) => {
	const data = await editPassword(formValue);
	return data;
});

export const editProfileByUserId = createAsyncThunk('user/editProfileByUserId', async (formValue: object) => {
	const data = await updateUser(formValue);
	return data;
});

export const editImageProfileByUserId = createAsyncThunk('user/editImageProfileByUserId', async (imgSRC: any) => {
	const data = await updateImageProfile(imgSRC);
	return data;
});

const initialState: UserState = {
	isLoading: false,
	isSending: false,
	message: null,
	isError: false,
	error: null
};

export const authSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		clearMessage: state => {
			state.isSending = false;
			state.message = null;
		}
	},
	extraReducers: builder => {
		builder
			// Handle Edit Password By User Id
			.addCase(editPasswordByUserId.pending, state => {
				state.isLoading = true;
				state.isError = false;
				state.error = null;
			})
			.addCase(editPasswordByUserId.fulfilled, (state, { payload }: any) => {
				state.isLoading = false;
				state.isSending = true;
				state.message = UpdatePasswordSuccess;
				state.isError = false;
				state.error = null;
			})

			// Handle Edit Profile By User Id
			.addCase(editProfileByUserId.pending, state => {
				state.isLoading = true;
				state.isError = false;
				state.error = null;
			})
			.addCase(editProfileByUserId.fulfilled, (state, { payload }: any) => {
				state.isLoading = false;
				state.isSending = true;
				state.message = UpdateProfileSuccess;
				state.isError = false;
				state.error = null;
			})

			// Handle Edit Image Profile By User Id
			.addCase(editImageProfileByUserId.pending, state => {
				state.isLoading = true;
				state.isError = false;
				state.error = null;
			})
			.addCase(editImageProfileByUserId.fulfilled, (state, { payload }: any) => {
				state.isLoading = false;
				state.isSending = true;
				state.message = 'Image Profile Updated Successfully';
				state.isError = false;
				state.error = null;
			})

			// Handle All Rejected
			.addMatcher(
				action => action.type.endsWith('/rejected'),
				(state, action) => {
					state.isLoading = false;
					state.isError = true;
					state.error = action.error.message;
				}
			);
	}
});

export const { clearMessage } = authSlice.actions;
export default authSlice.reducer;
