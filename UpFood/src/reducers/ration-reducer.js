// import { ACTION_TYPE } from '../actions';
import { ROLE } from '../constants';

const initialRationState = {
	id: null,
	login: null,
	roleId: ROLE.GUEST,
	session: null,
};

export const rationReducer = (state = initialRationState, action) => {
	switch (action.type) {
		// case ACTION_TYPE.SET_USER:
		// 	return {
		// 		...state,
		// 		...action.payload,
		// 	};
		// case ACTION_TYPE.LOGOUT: {
		// 	return initialRationState;
		// }
		default:
			return state;
	}
};
