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
	selectUserLogin,
	selectUserRole,
	selectUserSession,
} from '../../selectors';
import { logout } from '../../actions';

const navigation = [
	{ name: 'Главная', to: '/' },
	{ name: 'Блюда', to: '/meal' },
	{ name: 'Рацион', to: 'rations' },
	{ name: 'Пользователи', to: '/users' },
];

export const Header = () => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const dispatch = useDispatch();
	const roleId = useSelector(selectUserRole);
	const login = useSelector(selectUserLogin);
	const session = useSelector(selectUserSession);

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
						{navigation.map(item => (
							<a
								key={item.name}
								href={item.to}
								className="rounded-lg text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100"
							>
								{item.name}
							</a>
						))}
					</div>
					<div className="hidden lg:flex lg:flex-1 lg:justify-end">
						<div>
							<Link to="/basket">
								<ShoppingCartIcon className=" block h-6 w-auto rounded-lg px-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-100" />
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
								<Link to="/profile">{login}</Link>
								<ArrowLeftEndOnRectangleIcon
									onClick={() => dispatch(logout(session))}
									className=" block h-6 w-auto rounded-lg px-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-100"
								/>
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
							<Link href="#" className="-m-1.5 p-1.5">
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
						<div className="mt-6 flow-root">
							<div className="-my-6 divide-y divide-gray-500/10">
								<div className="space-y-2 py-6">
									{navigation.map(item => (
										<Link
											key={item.name}
											to={item.to}
											className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
										>
											{item.name}
										</Link>
									))}
								</div>

								<div className="py-6">
									<div>
										<Link to="/basket">
											<ShoppingCartIcon className=" block h-10 w-auto rounded-lg py-1 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50" />
										</Link>
									</div>
									<Link
										to="/login"
										className="-mx-3 block rounded-lg px-3 py-1 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
									>
										Войти
									</Link>
								</div>
							</div>
						</div>
					</Dialog.Panel>
				</Dialog>
			</header>
		</div>
	);
};
