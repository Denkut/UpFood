import { ACTION_TYPE } from '../actions';

const initialRationsState = {
	rations: [],
};

export const rationsReducer = (state = initialRationsState, action) => {
	switch (action.type) {
		case ACTION_TYPE.ADD_RATION_SUCCESS:
			return {
				...state,
				rations: [action.payload, ...state.rations],
			};
		case ACTION_TYPE.SET_RATIONS:
			return {
				...state,
				rations: action.payload,
			};

		default:
			return state;
	}
};
