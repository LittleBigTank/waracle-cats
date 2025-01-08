import { createSlice, createAsyncThunk, SerializedError } from '@reduxjs/toolkit';
import ImageService from '../../services/image.service';
import ImageListModel from '../../models/image-list.model';
import ImageModel from '../../models/image.model';

interface ImageListState {
	payload: ImageListModel | null;
	loading: boolean;
	error: SerializedError | null;
}

const initialState: ImageListState = {
	payload: null,
	loading: true,
	error: null,
};

const limit: number = 6;

export const fetchImages = createAsyncThunk<Array<ImageModel>, number>('fetch-images', async (page) => {
	return ImageService.getImages(page, limit);
});

export const uploadImage = createAsyncThunk<ImageModel, File>('upload-image', async (file) => {
	return ImageService.uploadImage(file);
});

const listSlice = createSlice({
	name: 'imageList',
	initialState,
	reducers: {
		reset: () => initialState,
	},
	extraReducers: (builder) => {
		builder.addCase(fetchImages.fulfilled, (state, action) => {
			state.payload = {
				images: [...state.payload?.images || [], ...action.payload.filter(x => (state.payload?.images || []).map(y => y.id).indexOf(x.id) === -1)],
				more: action.payload.length === limit
			}
			state.loading = false;
			state.error = null;
		});
		builder.addCase(fetchImages.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error;
		});

		builder.addCase(uploadImage.fulfilled, (state, action) => {
			state.payload = {
				images: [action.payload, ...state.payload?.images || []],
				more: state.payload?.more || true
			};
			state.loading = false;
			state.error = null;
		});
	},
});

export const { reset } = listSlice.actions;
export const reducer = listSlice.reducer;