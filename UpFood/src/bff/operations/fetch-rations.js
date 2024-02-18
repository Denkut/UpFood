import { getRations } from '../api';

export const fetchRations = async (searchPhrase, page, limit) => {
	const response = await getRations(searchPhrase, page, limit);
	const rations = response.rations;

	return {
		error: null,
		res: {
			rations: rations.map(ration => ({
				...ration,
			})),
			links: response.links,
		},
	};
};
