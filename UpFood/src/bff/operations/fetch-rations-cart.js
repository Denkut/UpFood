import { getRationsCart } from '../api';

export const fetchRationsCart = async () => {
	const response = await getRationsCart();
	const rations = response.rations;

	return {
		error: null,
		res: {
			rations: rations.map(ration => ({
				...ration,
			})),
		},
	};
};
