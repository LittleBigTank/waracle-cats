import { createSlice, createAsyncThunk, SerializedError } from '@reduxjs/toolkit';
import UserService from '../../services/user.service';
import UserModel from '../../models/user.model';

interface UserState {
	payload: UserModel | null;
	loading: boolean;
	error: SerializedError | null;
}

const initialState: UserState = {
	payload: null,
	loading: true,
	error: null,
};

export const fetchUser = createAsyncThunk<UserModel>('fetch-user', async () => {
	return UserService.getUser();
});

export const setUser = createAsyncThunk<UserModel, string>('set-user', async (userId) => {
	return UserService.setUser(userId);
});

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchUser.fulfilled, (state, action) => {
			state.payload = action.payload;
			state.loading = false;
			state.error = null;
		});
		builder.addCase(fetchUser.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error;
		});

		builder.addCase(setUser.fulfilled, (state, action) => {
			state.payload = action.payload;
			state.loading = false;
			state.error = null;
		});
		builder.addCase(setUser.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error;
		});
	},
});

export const reducer = userSlice.reducer;
