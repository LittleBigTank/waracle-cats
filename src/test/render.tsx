import React, { act } from 'react';
import { render as rtlRender } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { configureStore } from '@reduxjs/toolkit';
import { Provider as ReduxProvider } from 'react-redux';
import deepMerge from 'deepmerge';
import { MemoryRouter } from 'react-router-dom';
import { reducer } from '../../src/redux/store';
import { mockFavourites } from './favourites.mock';
import { mockImages } from './images.mock';
import { mockVotes } from './votes.mock';

// @ts-ignore - trick to get initial state
const intialReduxState = reducer({}, 'INITIALISE_FOR_TESTS');

type ReduxState = typeof intialReduxState;

export const createDefaultReduxState = (): ReduxState => {
	const defaultReduxState = {
		favourites: {
			loading: false,
			error: null,
			payload: mockFavourites,
		},
		imageList: {
			loading: false,
			error: null,
			payload: {
				images: mockImages,
				more: true
			},
		},
		user: {
			loading: false,
			error: null,
			payload: {
				id: 'W1234'
			},
		},
		votes: {
			loading: false,
			error: null,
			payload: mockVotes,
		}
	};
	return deepMerge(intialReduxState, defaultReduxState);
};

interface RenderOptions {
	reduxState?: ReduxState;
}

export const render = async (ui: React.ReactElement, options?: RenderOptions) => {
	const reduxStore = configureStore({
		reducer,
		preloadedState: options?.reduxState ?? createDefaultReduxState(),
		middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
	});

	// Render our component wrapped in the redux provider
	const renderResult = rtlRender(
		<MemoryRouter>
			<ReduxProvider store={reduxStore}>
				<main>{ui}</main>
			</ReduxProvider>
		</MemoryRouter>
	);

	await act(async () => {
		await new Promise((resolve) => setTimeout(resolve, 0));
	});

	return {
		renderResult,
		getReduxState: () => reduxStore.getState(),
	};
};

export const interact = {
	click: async (element: HTMLElement) => {
		await act(async () => {
			userEvent.click(element);
		});
	},
	clear: async (element: HTMLElement) => {
		await act(async () => {
			userEvent.clear(element);
		});
	},
	type: async (element: HTMLElement, text: string, options?: { clear: boolean }) => {
		if (options?.clear) {
			await interact.clear(element);
		}

		await act(async () => {
			userEvent.type(element, text);
		});
	},
	upload: async (element: HTMLElement, file: File) => {
		await act(async () => {
			userEvent.upload(element, file);
		});
	},
};
