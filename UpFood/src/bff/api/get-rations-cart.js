import { transformRation } from '../transformers';

export const getRationsCart = () =>
	fetch(`http://localhost:3005/rations`)
		.then(loadedRations => loadedRations.json())
		.then(loadedRations => ({
			rations: loadedRations && loadedRations.map(transformRation),
		}))
		.catch(error => console.log('Ошибка получения rations', error));
