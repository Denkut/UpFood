import { ACTION_TYPE } from '../actions';

const initialMealState = {
	id: '',
	title: '',
	imageUrl: '',
	type: '',
	calories: '',
	dietCategory: [],
	price: '',
};

export const mealReducer = (state = initialMealState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_MEAL_DATA:
			return {
				...state,
				...action.payload,
			};
		case ACTION_TYPE.RESET_MEAL_DATA:
			return initialMealState;

		default:
			return state;
	}
};
