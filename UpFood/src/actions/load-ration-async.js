import { setRationData } from './set-ration-data';

export const loadRationAsync = (requestServer, rationId) => dispatch =>
	requestServer('fetchRationsCart', rationId).then(rationData => {
		if (rationData.res) {
			dispatch(setRationData(rationData.res));
		}
		return rationData;
	});
