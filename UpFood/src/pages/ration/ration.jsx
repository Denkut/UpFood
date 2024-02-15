import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMatch, useParams } from 'react-router-dom';
import { RESET_RATION_DATA, loadRationAsync } from '../../actions';
import { RationContent, RationDescription, RationEdit } from './components';
import { selectRation } from '../../selectors';
import { useServerRequest } from '../../hooks';

export const Ration = () => {
	const [error, setError] = useState(null);
	const [meals, setMeals] = useState(null);
	const isCreating = !!useMatch('/ration');
	const isEditing = !!useMatch('/ration/:id/edit');
	const [isRationLoading, setIsRationLoading] = useState(true);
	const [isMealsLoading, setIsMealsLoading] = useState(true);
	const dispatch = useDispatch();
	const params = useParams();
	const requestServer = useServerRequest();
	const ration = useSelector(selectRation);

	useLayoutEffect(() => {
		dispatch(RESET_RATION_DATA);
	}, [dispatch, isCreating]);

	useEffect(() => {
		requestServer('fetchAllMeals').then(({ res: { meals } }) => {
			setMeals(meals);
			setIsMealsLoading(false);
		});
	}, [requestServer]);

	useEffect(() => {
		if (isCreating) {
			setIsRationLoading(false);
			return;
		}

		dispatch(loadRationAsync(requestServer, params.id)).then(postData => {
			setError(postData.error);
			setIsRationLoading(false);
		});
	}, [dispatch, requestServer, params.id, isCreating]);

	if (isMealsLoading || isRationLoading) {
		return null;
	}

	return (
		<div>
			{error && (
				<div className="mb-4 bg-red-200 p-4 text-red-800">
					Ошибка: {error.message}
				</div>
			)}
			{isCreating || isEditing ? (
				<RationEdit ration={ration} meals={meals} />
			) : (
				<>
					<RationContent ration={ration} meals={meals} />
					<RationDescription
						ration={ration}
						content={ration.content}
						goal={ration.goal}
					/>
				</>
			)}
		</div>
	);
};
