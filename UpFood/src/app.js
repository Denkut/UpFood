import { Route, Routes } from 'react-router-dom';
import { Authorization, Main, Registration } from './pages';
import { Footer, Header } from './components';

export const App = () => {
	return (
		<div>
			<Header />
			<div className=" p-32">
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/login" element={<div>Авторизация</div>} />
					<Route path="/register" element={<div>Регистрация</div>} />
					<Route path="/users" element={<div>Пользователи</div>} />
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
