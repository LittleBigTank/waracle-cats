import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, ReduxState } from './redux/store';
import { fetchUser } from './redux/slices/user';
import App from './App';
import Loader from './components/loader/loader.component';

const AppRoot = () => {
	const dispatch = useDispatch<AppDispatch>();
  	const isUserLoading = useSelector((state: ReduxState) => state.user.loading);
	const user = useSelector((state: ReduxState) => state.user.payload);
	const hasError = false;

	useEffect(() => {
		const initialise = async () => {
			try {
				dispatch(fetchUser());
			} catch (e) {
				// HUGE ERROR
			}
		};

		initialise();
	}, [dispatch]);

	if (hasError) {
		return null;
	}

  	if (isUserLoading) {
		return <Loader size={60} />;
	}

	return (
		<App />
	);
};

export default AppRoot;
