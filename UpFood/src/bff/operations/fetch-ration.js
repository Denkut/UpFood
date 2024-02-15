import { getRation } from '../api';

export const fetchRation = async rationId => {
	const ration = await getRation(rationId);

	return {
		error: null,
		res: ration,
	};
};
