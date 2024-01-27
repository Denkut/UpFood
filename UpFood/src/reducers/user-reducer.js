import { ACTION_TYPE } from '../actions';
import { ROLE } from '../constants';

const initialUserState = {
	id: null,
	login: null,
	roleId: ROLE.GUEST,
	session: null,
	fullName: null,
	weight: null,
	goal: null,
	height: null,
	age: null,
	email: null,
	dietCategory: null,
	allergenicIngredients: null,
};

export const userReducer = (state = initialUserState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_USER:
			return {
				...state,
				...action.payload,
			};
		case ACTION_TYPE.LOGOUT: {
			return initialUserState;
		}
		case ACTION_TYPE.USER_UPDATE: {
			return {
				...state,
				...action.payload,
			};
		}
		default:
			return state;
	}
};
