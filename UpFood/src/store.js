import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import {
	appReducer,
	userReducer,
	usersReducer,
	mealReducer,
	mealsReducer,
	rationsReducer,
	rationReducer,
} from './reducers';

const reducer = combineReducers({
	app: appReducer,
	user: userReducer,
	users: usersReducer,
	meal: mealReducer,
	meals: mealsReducer,
	ration: rationReducer,
	rations: rationsReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
