import { transformRation } from '../transformers';

export const getRation = async rationId =>
	fetch(`http://localhost:3005/rations/${rationId}`)
		.then(res => {
			if (res.ok) {
				return res;
			}

			const error =
				res.status === 404
					? 'Такая страница не существует'
					: 'Что-то пошло не так. Попробуйте еще раз позднее.';

			return Promise.reject(error);
		})
		.then(loadedRation => loadedRation.json())
		.then(loadedRation => loadedRation && transformRation(loadedRation));
