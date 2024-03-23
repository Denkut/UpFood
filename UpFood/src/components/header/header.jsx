import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import {
	Bars3Icon,
	XMarkIcon,
	ShoppingCartIcon,
	ArrowLeftEndOnRectangleIcon,
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import Logo from '../../assets/Logo.png';
import { ROLE } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectCart,
	selectUserLogin,
	selectUserRole,
	selectUserSession,
} from '../../selectors';
import { logout } from '../../actions';
import { HeaderMobile } from './components';
import { getCartItemCount } from '../../utils';

const navigation = [
	{ name: 'Главная', to: '/' },
	{ name: 'Блюда', to: '/meals' },
	{ name: 'Рационы', to: '/rations' },
	{ name: 'Пользователи', to: '/users' },
];

export const Header = () => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const dispatch = useDispatch();
	const roleId = useSelector(selectUserRole);
	const login = useSelector(selectUserLogin);
	const session = useSelector(selectUserSession);
	const userCart = useSelector(selectCart);
	const cartItemCount = getCartItemCount(userCart);
	const onLogout = () => {
		dispatch(logout(session));
		sessionStorage.removeItem('userData');
	};

	let updatedNavigation = [...navigation];
	if (roleId !== ROLE.ADMIN) {
		updatedNavigation = updatedNavigation.filter(
			item => item.name !== 'Пользователи',
		);
	}
	return (
		<div className="bg-white">
			<header className="fixed inset-x-0 top-0 z-50 bg-white shadow-md">
				<nav
					className="flex items-center justify-between p-6 lg:px-8"
					aria-label="Global"
				>
					<div className="flex lg:flex-1">
						<Link to="/" className="-m-1.5 p-1.5">
							<span className="sr-only">UPFOOD</span>
							<img
								className=" h-16 w-auto"
								src={Logo}
								alt="Upfood"
							/>
						</Link>
					</div>
					<div className="flex lg:hidden">
						<button
							type="button"
							className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
							onClick={() => setMobileMenuOpen(true)}
						>
							<span className="sr-only">Open main menu</span>
							<Bars3Icon className="h-6 w-6" aria-hidden="true" />
						</button>
					</div>
					<div className="hidden lg:flex lg:gap-x-12">
						{updatedNavigation.map(item => (
							<Link
								key={item.name}
								to={item.to}
								className="rounded-lg text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100"
							>
								{item.name}
							</Link>
						))}
					</div>
					<div className="ml-12 hidden lg:flex lg:flex-1 lg:justify-end">
						{roleId === ROLE.ADMIN && (
							<>
								<Link
									to="/meal"
									className="-mx-3 block rounded-lg px-3 text-sm  font-semibold leading-7 text-gray-900 hover:bg-gray-50"
								>
									Добавить блюдо
								</Link>
								<Link
									to="/ration"
									className="mx-3 block rounded-lg px-3 text-sm  font-semibold leading-7 text-gray-900 hover:bg-gray-50"
								>
									Добавить рацион
								</Link>
							</>
						)}
						<div className="relative flex items-center">
							<Link to="/cart" className="relative">
								<ShoppingCartIcon className="block h-6 w-auto rounded-lg px-2.5 text-base font-semibold leading-7 text-gray-900 hover:text-emerald-800" />
								{cartItemCount > 0 && (
									<span className="absolute right-3 top-0 flex h-4 w-4 -translate-y-1/2 translate-x-1/2 transform items-center justify-center rounded-full bg-red-500 text-xs text-white">
										{cartItemCount}
									</span>
								)}
							</Link>
						</div>

						{roleId === ROLE.GUEST ? (
							<Link
								to="/login"
								className="rounded-lg px-2.5 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100"
							>
								Войти
							</Link>
						) : (
							<>
								<div className="flex items-center">
									<Link
										to="/profile"
										className="block rounded-lg px-2 text-lg font-semibold leading-7 text-gray-900 hover:bg-gray-50"
									>
										{login}
									</Link>
									<div className="relative">
										<ArrowLeftEndOnRectangleIcon
											onClick={onLogout}
											className="block h-6 w-16 cursor-pointer rounded-lg px-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-100"
										/>
									</div>
								</div>
							</>
						)}
					</div>
				</nav>
				<Dialog
					as="div"
					className="lg:hidden"
					open={mobileMenuOpen}
					onClose={setMobileMenuOpen}
				>
					<div className="fixed inset-0 z-50" />
					<Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
						<div className="flex items-center justify-between">
							<Link to="/" className="-m-1.5 p-1.5">
								<span className="sr-only">Upfood</span>
								<img
									className="h-8 w-auto"
									src={Logo}
									alt="Upfood"
								/>
							</Link>
							<button
								type="button"
								className="-m-2.5 rounded-md p-2.5 text-gray-700"
								onClick={() => setMobileMenuOpen(false)}
							>
								<span className="sr-only">Close menu</span>
								<XMarkIcon
									className="h-6 w-6"
									aria-hidden="true"
								/>
							</button>
						</div>

						<HeaderMobile
							updatedNavigation={updatedNavigation}
							onLogout={onLogout}
							cartItemCount={cartItemCount}
						/>
					</Dialog.Panel>
				</Dialog>
			</header>
		</div>
	);
};
