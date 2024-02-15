import { setRationData } from './set-ration-data';

export const saveRationAsync = (requestServer, newRationData) => dispatch =>
	requestServer('saveRation', newRationData).then(updatedRation => {
		dispatch(setRationData(updatedRation.res));
		return updatedRation.res;
	});
