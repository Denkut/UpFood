import { transformRation } from '../transformers';

export const getRations = (searchPhrase, page, limit) =>
	fetch(
		`http://localhost:3005/rations?title_like=${searchPhrase}&_page=${page}&_limit=${limit}`,
	)
		.then(loadedRations =>
			Promise.all([
				loadedRations.json(),
				loadedRations.headers.get('Link'),
			]),
		)
		.then(([loadedRations, links]) => ({
			rations: loadedRations && loadedRations.map(transformRation),
			links,
		}))
		.catch(error => console.log('Ошибка получения rations, links', error));
