// import { ACTION_TYPE } from '../actions';
import { ROLE } from '../constants';

const initialRationsState = {
	id: null,
	login: null,
	roleId: ROLE.GUEST,
	session: null,
};

export const rationsReducer = (state = initialRationsState, action) => {
	switch (action.type) {
		// case ACTION_TYPE.SET_USER:
		// 	return {
		// 		...state,
		// 		...action.payload,
		// 	};
		// case ACTION_TYPE.LOGOUT: {
		// 	return initialRationsState;
		// }
		default:
			return state;
	}
};
