import {
	PencilSquareIcon,
	TrashIcon,
	XMarkIcon,
} from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserRole } from '../../../selectors';
import { useNavigate } from 'react-router-dom';
import { CLOSE_MODAL, openModal, removeMealAsync } from '../../../actions';
import { useServerRequest } from '../../../hooks';
import { checkAccess } from '../../../utils';
import { ROLE } from '../../../bff/constants';
import { AddToCartButton, Modal } from '../../../components';
import { PROP_TYPE } from '../../../constants';

export const MealContent = ({
	meal: { id, title, imageUrl, type, calories, dietCategory, price },
}) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const requestServer = useServerRequest();
	const userRole = useSelector(selectUserRole);

	const onMealRemove = id => {
		dispatch(
			openModal({
				text: 'Удалить блюдо?',
				onConfirm: () => {
					dispatch(removeMealAsync(requestServer, id)).then(() => {
						navigate('/');
					});
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	const isAdmin = checkAccess([ROLE.ADMIN], userRole);

	return (
		<div className="mb-6 flex rounded-md bg-white p-6 shadow-lg">
			<div className="flex-shrink-0">
				<img
					src={imageUrl}
					alt={title}
					className="mb-4 h-[400px] w-[400px] rounded-md object-cover"
				/>
			</div>
			<div className="ml-8 flex flex-col">
				<div className="flex">
					{isAdmin && (
						<>
							<PencilSquareIcon
								onClick={() => navigate(`/meal/${id}/edit`)}
								className="block h-6 w-6 cursor-pointer rounded-lg text-base font-semibold leading-7 text-gray-900 hover:text-emerald-900"
							/>
							<>
								<TrashIcon
									onClick={() => onMealRemove(id)}
									className="ml-2 block h-6 w-6 cursor-pointer rounded-lg text-base font-semibold leading-7 text-gray-900 hover:text-red-800"
								/>
								<XMarkIcon
									onClick={() => navigate(`/`)}
									className="ml-64 h-6 w-6 cursor-pointer rounded-lg text-base font-semibold leading-7 text-gray-900 hover:text-gray-400"
								/>
							</>
						</>
					)}
				</div>

				<h2 className="mt-2 max-w-72  text-3xl font-semibold">
					{title}
				</h2>
				<div className="mb-2 flex items-center text-gray-500">
					<div className="mr-2 text-base  text-emerald-700">
						{type}
					</div>
					<span className="mr-2">{calories} ккал.</span>
				</div>

				<div className="mb-2 flex items-center text-red-900">
					<span className="mr-2">{dietCategory}</span>
				</div>
				<div className="mb-2 text-3xl font-bold text-gray-900">
					{price} ₽
				</div>
				{userRole !== ROLE.GUEST && (
					<AddToCartButton
						itemId={id}
						itemType="meal"
						className="w-96 rounded-full bg-emerald-800 px-4 py-2 font-bold text-white hover:bg-emerald-700 focus:outline-none"
					/>
				)}
			</div>

			<Modal />
		</div>
	);
};

MealContent.propTypes = {
	meal: PROP_TYPE.MEAL,
};
