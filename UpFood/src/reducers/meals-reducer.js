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
		// ... другие case по необходимости
		default:
			return state;
	}
};
