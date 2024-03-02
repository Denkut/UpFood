import { ACTION_TYPE } from '../actions';

const initialMealsState = {
	meals: [],
	selectedMeal: null,
};

export const mealsReducer = (state = initialMealsState, action) => {
	switch (action.type) {
		case ACTION_TYPE.LOAD_MEALS_SUCCESS:
			return {
				...state,
				meals: action.payload,
			};
		case ACTION_TYPE.LOAD_MEAL_SUCCESS:
			return {
				...state,
				selectedMeal: action.payload,
			};
		case ACTION_TYPE.ADD_MEAL_SUCCESS:
			return {
				...state,
				meals: [action.payload, ...state.meals],
			};
		case ACTION_TYPE.SET_MEALS:
			return {
				...state,
				meals: action.payload,
			};
		default:
			return state;
	}
};
