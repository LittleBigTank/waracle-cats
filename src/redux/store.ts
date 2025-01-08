import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { reducer as favouriteReducer } from './slices/favourite';
import { reducer as imageListReducer } from './slices/image-list';
import { reducer as userReducer } from './slices/user';
import { reducer as voteReducer } from './slices/vote';

export const reducer = combineReducers({
	favourites: favouriteReducer,
	imageList: imageListReducer,
	user: userReducer,
	votes: voteReducer,
});

const store = configureStore({
	reducer,
	devTools: process.env.NODE_ENV !== 'production', //enables redux dev tools for only dev environments
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware({
			serializableCheck: false,
		});
	},
});

export type AppDispatch = typeof store.dispatch;
export type ReduxState = ReturnType<typeof store.getState>;

export default store;
