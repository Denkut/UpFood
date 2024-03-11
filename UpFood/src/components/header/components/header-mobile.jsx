import {
	ArrowLeftEndOnRectangleIcon,
	ShoppingCartIcon,
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { ROLE } from '../../../constants';
import { useSelector } from 'react-redux';
import { selectUserLogin, selectUserRole } from '../../../selectors';

export const HeaderMobile = ({ navigation, onLogout }) => {
	const roleId = useSelector(selectUserRole);
	const login = useSelector(selectUserLogin);

	return (
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
					{roleId === ROLE.ADMIN && (
						<>
							<Link
								to="/meal"
								className="-mx-3 block rounded-lg px-3 py-1 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
							>
								Добавить блюдо
							</Link>
							<Link
								to="/ration"
								className="-mx-3 block rounded-lg px-3 py-1 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
							>
								Добавить рацион
							</Link>
						</>
					)}
					<div>
						<Link to="/cart">
							<ShoppingCartIcon className=" block h-10 w-auto rounded-lg py-1 text-base font-semibold leading-7 text-gray-900 hover:text-emerald-800" />
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
							<Link
								to="/profile"
								className="-mx-3 block rounded-lg px-3 text-lg font-semibold leading-7 text-gray-900 hover:bg-gray-50"
							>
								{login}
							</Link>
							<ArrowLeftEndOnRectangleIcon
								onClick={onLogout}
								className=" block h-6 w-auto cursor-pointer rounded-lg px-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-100"
							/>
						</>
					)}
				</div>
			</div>
		</div>
	);
};
