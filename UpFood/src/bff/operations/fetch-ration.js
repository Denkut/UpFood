import { getRation } from '../api';

export const fetchRation = async rationId => {
	let ration;
	let error;

	try {
		ration = await getRation(rationId);
	} catch (rationError) {
		error = rationError;
	}

	if (error) {
		return {
			error,
			res: null,
		};
	}

	return {
		error: null,
		res: ration,
	};
};
