import { ACTION_TYPE } from '../actions';

const initialMealState = {
	id: '',
	title: '',
	imageUrl: '',
	type: '',
	calories: '',
	dietCategory: [],
	price: '',
	isEditing: false,
};

export const mealReducer = (state = initialMealState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_MEAL_DATA:
			return {
				...state,
				...action.payload,
			};
		case ACTION_TYPE.START_EDITING_MEAL:
			return {
				...state,
				isEditing: true,
			};
		case ACTION_TYPE.CANCEL_EDITING_MEAL:
			return {
				...state,
				isEditing: false,
			};
		case ACTION_TYPE.UPDATE_EDITED_MEAL_DATA:
			// Обновляем только editedData, чтобы не перезаписать другие ключи
			return {
				...state,
				editedData: {
					...state.editedData,
					...action.payload,
				},
			};
		case ACTION_TYPE.RESET_MEAL_DATA:
			return {
				...initialMealState,
			};
		default:
			return state;
	}
};
