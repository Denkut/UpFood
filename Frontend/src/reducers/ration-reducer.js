import { ACTION_TYPE } from '../actions';

const initialRationState = {
	id: '',
	title: '',
	imageUrl: '',
	goal: '',
	meals: [],
	content: '',
	totalCalories: '',
	totalPrices: '',
	quantity: '',
};

export const rationReducer = (state = initialRationState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_RATION_DATA:
			return {
				...state,
				...action.payload,
			};
		case ACTION_TYPE.RESET_RATION_DATA:
			return initialRationState;
		case ACTION_TYPE.ADD_MEAL_TO_RATION:
			return {
				...state,
				meals: [...state.meals, action.payload],
			};
		case ACTION_TYPE.REMOVE_MEAL_FROM_RATION:
			return {
				...state,
				meals: state.meals.filter(meal => meal.id !== action.payload),
			};
		default:
			return state;
	}
};
