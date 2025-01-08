import { createSlice, createAsyncThunk, SerializedError } from '@reduxjs/toolkit';
import FavouriteService from '../../services/favourite.service';
import FavouriteModel from '../../models/favourite.model';

interface FavouriteState {
	payload: Array<FavouriteModel> | null;
	loading: boolean;
	error: SerializedError | null;
}

interface AddFavouriteProps {
	imageId: string;
	userId: string;
}

const initialState: FavouriteState = {
	payload: null,
	loading: true,
	error: null,
};

export const fetchFavourites = createAsyncThunk<Array<FavouriteModel>>('fetch-favourites', async () => {
	return FavouriteService.getFavourites();
});

export const addFavourite = createAsyncThunk<FavouriteModel, AddFavouriteProps>('add-favourite', async (values) => {
	return FavouriteService.addFavourite(values.imageId, values.userId);
});

export const removeFavourite = createAsyncThunk<number, number>('remove-favourite', async (id) => {
	return FavouriteService.removeFavourite(id);
});

const favouriteSlice = createSlice({
	name: 'favourite',
	initialState,
	reducers: {
		resetFavourites: () => initialState,
	},
	extraReducers: (builder) => {
		builder.addCase(fetchFavourites.fulfilled, (state, action) => {
			state.payload = action.payload;
			state.loading = false;
			state.error = null;
		});
		builder.addCase(fetchFavourites.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error;
		});

		builder.addCase(addFavourite.fulfilled, (state, action) => {
			state.payload = [...state.payload || [], action.payload];
			state.loading = false;
			state.error = null;
		});

		builder.addCase(removeFavourite.fulfilled, (state, action) => {
			state.payload = (state.payload || []).filter(x => x.id !== action.payload);
			state.loading = false;
			state.error = null;
		});
	},
});

export const { resetFavourites } = favouriteSlice.actions;
export const reducer = favouriteSlice.reducer;
