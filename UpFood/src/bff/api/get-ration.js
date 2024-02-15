import { transformRation } from '../transformers';

export const getRation = async rationId =>
	fetch(`http://localhost:3005/rations/${rationId}`)
		.then(loadedRation => loadedRation.json())
		.then(loadedRation => loadedRation && transformRation(loadedRation));
