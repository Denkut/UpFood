import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMatch, useParams } from 'react-router-dom';
import { RESET_RATION_DATA, loadRationAsync, setMealsAll } from '../../actions';
import { RationContent, RationDescription, RationEdit } from './components';
import { selectMeals, selectRation } from '../../selectors';
import { useServerRequest } from '../../hooks';
import { Error, PrivateContent } from '../../components';
import { ROLE } from '../../constants';

export const Ration = () => {
	const [error, setError] = useState(null);
	const isCreating = !!useMatch('/ration');
	const isEditing = !!useMatch('/ration/:id/edit');
	const [isRationLoading, setIsRationLoading] = useState(true);
	const [isMealsLoading, setIsMealsLoading] = useState(true);
	const dispatch = useDispatch();
	const params = useParams();
	const requestServer = useServerRequest();
	const ration = useSelector(selectRation);
	const meals = useSelector(selectMeals);

	useEffect(() => {
		dispatch(RESET_RATION_DATA);
		requestServer('fetchMealsAll')
			.then(({ res: { meals } }) => {
				dispatch(setMealsAll(meals));
				setIsMealsLoading(false);
			})
			.catch(error => {
				console.error('Error fetching meals:', error);
				setIsMealsLoading(false);
			});
	}, [dispatch, requestServer]);

	useEffect(() => {
		if (isCreating) {
			setIsRationLoading(false);
			return;
		}

		dispatch(loadRationAsync(requestServer, params.id))
			.then(postData => {
				setError(postData.error);
				setIsRationLoading(false);
			})
			.catch(error => {
				console.error('Error loading ration:', error);
				setIsRationLoading(false);
			});
	}, [dispatch, requestServer, params.id, isCreating]);

	if (isMealsLoading || isRationLoading) {
		return null;
	}

	const SpecificRationPage =
		isCreating || isEditing ? (
			<PrivateContent access={[ROLE.ADMIN]} serverError={error}>
				<RationEdit ration={ration} meals={meals} />
			</PrivateContent>
		) : (
			<>
				<RationContent ration={ration} meals={meals} />
				<RationDescription
					ration={ration}
					content={ration.content}
					goal={ration.goal}
				/>
			</>
		);

	return error ? <Error error={error} /> : SpecificRationPage;
};
