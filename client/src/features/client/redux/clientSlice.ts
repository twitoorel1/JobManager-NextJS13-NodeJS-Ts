import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ClientState } from '@/types/global';
import { findAllCompany, findCompanyById, createClient } from '../services/client.service';

export const findAllCompanies = createAsyncThunk('client/findAllCompanies', async () => {
	const data = await findAllCompany();
	return data;
});

export const findOneCompanyById = createAsyncThunk('client/findOneCompanyById', async (idCompany: string) => {
	const data = await findCompanyById(idCompany);
	return data;
});

export const createNewClient = createAsyncThunk('client/createNewClient', async (formValue: object) => {
	const data = await createClient(formValue);
	return data;
});

const initialState: ClientState = {
	isLoading: false,
	isSending: false,
	message: null,
	client: null,
	allClients: [],
	isError: false,
	error: undefined
};

export const clientSlice = createSlice({
	name: 'client',
	initialState,
	reducers: {
		clearMessage: state => {
			state.isSending = false;
			state.message = null;
		}
	},
	extraReducers: builder => {
		builder
			// Handle Find All Companies
			.addCase(findAllCompanies.pending, state => {
				state.isLoading = true;
				state.isError = false;
				state.error = undefined;
			})
			.addCase(findAllCompanies.fulfilled, (state, { payload }: any) => {
				state.isLoading = false;
				state.isSending = true;
				state.message = 'Find All Companies Success';
				state.client = null;
				state.allClients = payload.allCompanies;
				state.isError = false;
				state.error = undefined;
			})

			// Handle Find One Client By Id
			.addCase(findOneCompanyById.pending, state => {
				state.isLoading = true;
				state.isError = false;
				state.error = undefined;
			})
			.addCase(findOneCompanyById.fulfilled, (state, { payload }: any) => {
				state.isLoading = false;
				state.isSending = true;
				state.message = 'Find One Client By Id Success';
				state.client = payload.company;
				state.isError = false;
				state.error = undefined;
			})

			// Handle Find One Client By Id
			.addCase(createNewClient.pending, state => {
				state.isLoading = true;
				state.isError = false;
				state.error = undefined;
			})
			.addCase(createNewClient.fulfilled, (state, { payload }: any) => {
				state.isLoading = false;
				state.isSending = true;
				state.message = payload.message;
				state.isError = false;
				state.error = undefined;
				state.client = payload.company;
			})

			// Handle All Rejected
			.addMatcher(
				action => action.type.endsWith('/rejected'),
				(state, action) => {
					state.isLoading = false;
					state.isError = true;
					state.error = action.error.message;
					state.isSending = false;
					state.message = null;
					state.client = null;
				}
			);
	}
});

export const { clearMessage } = clientSlice.actions;
export default clientSlice.reducer;
