import { ACTION_TYPE } from '../actions';

const initialState = {
	meals: [],
	rations: [],
};

export const cartReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_CART:
			return {
				...state,
				...action.payload,
			};
		case ACTION_TYPE.ADD_TO_CART:
			return {
				...state,
				[action.payload.type]: [
					...state[action.payload.type],
					action.payload.item,
				],
			};
		case ACTION_TYPE.UPDATE_CART_ITEM_QUANTITY: {
			const updatedMeals = state.meals.map(item =>
				item.id === action.payload.itemId
					? { ...item, count: action.payload.quantity }
					: item,
			);
			const updatedRations = state.rations.map(item =>
				item.id === action.payload.itemId
					? { ...item, count: action.payload.quantity }
					: item,
			);

			return {
				...state,
				meals: updatedMeals,
				rations: updatedRations,
			};
		}

		default:
			return state;
	}
};
