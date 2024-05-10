import { setRations } from './set-rations';

export const loadRationsAsync = requestServer => dispatch =>
	requestServer('fetchRations').then(rationsData => {
		if (rationsData.res) {
			dispatch(setRations(rationsData.res));
		}
		return rationsData;
	});
