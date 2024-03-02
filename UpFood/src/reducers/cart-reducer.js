import { ACTION_TYPE } from '../actions';

const initialState = {
	user: {
		cart: {
			meals: [],
			rations: [],
		},
	},
};

const cartReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_CART:
			return {
				...state,
				user: {
					...state.user,
					cart: action.payload,
				},
			};
		case ACTION_TYPE.ADD_TO_CART:
			return {
				...state,
				cartItems: [...state.cartItems, action.payload],
			};

		case ACTION_TYPE.REMOVE_ITEM_FROM_CART:
			return {
				...state,
				cartItems: state.cartItems.filter(
					item => item.id !== action.payload,
				),
			};

		case ACTION_TYPE.UPDATE_CART_ITEM_QUANTITY:
			return {
				...state,
				cartItems: state.cartItems.map(item =>
					item.id === action.payload.itemId
						? { ...item, quantity: action.payload.quantity }
						: item,
				),
			};

		default:
			return state;
	}
};

export default cartReducer;
