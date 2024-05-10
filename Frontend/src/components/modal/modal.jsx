import { Button } from '../button/button';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectModalIsOpen,
	selectModalOnCancel,
	selectModalOnConfirm,
	selectModalText,
} from '../../selectors';
export const Modal = () => {
	const isOpen = useSelector(selectModalIsOpen);
	const text = useSelector(selectModalText);
	const onConfirm = useSelector(selectModalOnConfirm);
	const onCancel = useSelector(selectModalOnCancel);
	const dispatch = useDispatch();

	if (!isOpen) {
		return null;
	}
	return (
		<div className="fixed inset-0 overflow-y-auto">
			<div className="flex min-h-screen items-center justify-center">
				<div className="fixed inset-0 bg-black opacity-50"></div>
				<div className="rounded-md bg-white p-4 text-center">
					<div className="mb-4 text-lg font-semibold ">
						<div className="relative z-10 items-center justify-center space-x-4 rounded-md bg-white p-4 text-center">
							<h3>{text}</h3>
							<Button onClick={() => dispatch(onConfirm)}>
								Да
							</Button>
							<Button onClick={() => dispatch(onCancel)}>
								Отмена
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
