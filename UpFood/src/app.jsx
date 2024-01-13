import { Route, Routes } from 'react-router-dom';
import { Authorization, Main, Profile, Registration, Users } from './pages';
import { Footer, Header } from './components';

export const App = () => {
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
					<Route path="/rations" element={<div>Рационы</div>} />
					<Route path="/meal" element={<div>Блюдо</div>} />
					<Route path="/meal/:id" element={<div>Блюдо</div>} />
					<Route path="/meal/:id/edit" element={<div>Блюдо</div>} />
					<Route path="/basket" element={<div>Корзина</div>} />
					<Route path="*" element={<div>Ошибка</div>} />
				</Routes>
			</div>
			<Footer />
			{/* <Modal /> */}
		</div>
	);
};
