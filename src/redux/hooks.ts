import { useSelector as useReduxSelector } from 'react-redux';
import { ReduxState } from './store';

export const useSelector = <T>(selector: (state: ReduxState) => T) => {
	return useReduxSelector(selector);
};
