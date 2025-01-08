import { createSlice, createAsyncThunk, SerializedError } from '@reduxjs/toolkit';
import VoteService from '../../services/vote.service';
import VoteModel from '../../models/vote.model';

interface VoteState {
	payload: Array<VoteModel> | null;
	loading: boolean;
	error: SerializedError | null;
}

interface SetVoteProps {
	imageId: string;
	userId: string;
	value: number;
}

const initialState: VoteState = {
	payload: null,
	loading: true,
	error: null,
};

export const fetchVotes = createAsyncThunk<Array<VoteModel>>('fetch-votes', async () => {
	return VoteService.getVotes();
});

export const setVote = createAsyncThunk<Array<VoteModel>, SetVoteProps>('set-vote', async (values) => {
	return VoteService.setVote(values.imageId, values.userId, values.value);
});

const voteSlice = createSlice({
	name: 'vote',
	initialState,
	reducers: {
		reset: () => initialState,
	},
	extraReducers: (builder) => {
		builder.addCase(fetchVotes.fulfilled, (state, action) => {
			state.payload = action.payload;
			state.loading = false;
			state.error = null;
		});
		builder.addCase(fetchVotes.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error;
		});

		builder.addCase(setVote.fulfilled, (state, action) => {
			state.payload = action.payload;
			state.loading = false;
			state.error = null;
		});
	},
});

export const { reset } = voteSlice.actions;
export const reducer = voteSlice.reducer;
