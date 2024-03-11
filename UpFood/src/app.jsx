import { Route, Routes } from 'react-router-dom';
import {
	Authorization,
	Cart,
	Main,
	Meal,
	MealList,
	Profile,
	Ration,
	RationList,
	Registration,
	Users,
} from './pages';
import { Footer, Header } from './components';
import { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCart, setUser } from './actions';

export const App = () => {
	const dispatch = useDispatch();

	useLayoutEffect(() => {
		const currentUserDataJSON = sessionStorage.getItem('userData');

		if (!currentUserDataJSON) {
			return;
		}

		const currentUserData = JSON.parse(currentUserDataJSON);

		dispatch(
			setUser({
				...currentUserData,
				roleId: Number(currentUserData.roleId),
			}),
		);

		if (currentUserData.cart) {
			dispatch(setCart(currentUserData.cart));
		}
	}, [dispatch]);

	return (
		<div className="">
			<Header />
			<div className=" pb-36 pt-32">
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/login" element={<Authorization />} />
					<Route path="/register" element={<Registration />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/users" element={<Users />} />
					<Route path="/ration" element={<Ration />} />
					<Route path="/ration/:id" element={<Ration />} />
					<Route path="/ration/:id/edit" element={<Ration />} />
					<Route path="/rations" element={<RationList />} />
					<Route path="/meal" element={<Meal />} />
					<Route path="/meals" element={<MealList />} />
					<Route path="/meal/:id" element={<Meal />} />
					<Route path="/meal/:id/edit" element={<Meal />} />
					<Route path="/cart" element={<Cart />} />
					<Route path="*" element={<div>Ошибка</div>} />
				</Routes>
			</div>
			<Footer />
			{/* <Modal /> */}
		</div>
	);
};
