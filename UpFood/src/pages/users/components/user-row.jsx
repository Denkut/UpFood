import { useServerRequest } from '../../../hooks';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { TableRow } from './table-row';
import { BookmarkSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { PROP_TYPE } from '../../../constants';

export const UserRow = ({
	id,
	login,
	registeredAt,
	roleId: userRoleId,
	roles,
	onUserRemove,
}) => {
	const [initialRoleId, setInitialRoleId] = useState(userRoleId);
	const [selectedRoleId, setSelectedRoleId] = useState(userRoleId);
	const requestServer = useServerRequest();

	const onRoleChange = ({ target }) => {
		setSelectedRoleId(Number(target.value));
	};

	const onRoleSave = (userId, newUserRoleId) => {
		requestServer('updateUserRole', userId, newUserRoleId).then(() => {
			setInitialRoleId(newUserRoleId);
		});
	};

	const isSaveButtonDisabled = selectedRoleId === initialRoleId;

	return (
		<div className="items-centerrounded-lg ml-[140px] flex max-w-6xl justify-center py-2">
			<TableRow>
				<div className=" mx-[80px]  min-w-[200px] font-bold text-white ">
					{login}
				</div>
				<div className="mr-20  min-w-[200px] font-bold text-white">
					{registeredAt}
				</div>
				<div className="mr-10 min-w-[100px] ">
					<select value={selectedRoleId} onChange={onRoleChange}>
						{roles.map(({ id: roleId, name: roleName }) => (
							<option key={roleId} value={roleId}>
								{roleName}
							</option>
						))}
					</select>
				</div>
				<BookmarkSquareIcon
					disabled={isSaveButtonDisabled}
					onClick={() => onRoleSave(id, selectedRoleId)}
					className={`mr-2 block h-7 cursor-pointer items-center rounded-lg pt-1 text-base font-semibold leading-7 text-gray-900 ${
						isSaveButtonDisabled
							? 'opacity-50'
							: 'hover:text-green-800'
					}`}
				/>
			</TableRow>

			<TrashIcon
				onClick={onUserRemove}
				className="flex h-8 w-auto cursor-pointer items-center  rounded-lg p-1 text-base font-semibold leading-7 text-gray-900 hover:text-red-800 "
			/>
		</div>
	);
};

UserRow.propTypes = {
	id: PropTypes.string.isRequired,
	login: PropTypes.string.isRequired,
	registeredAt: PropTypes.string.isRequired,
	roleId: PROP_TYPE.ROLE_ID.isRequired,
	roles: PropTypes.arrayOf(PROP_TYPE.ROLE).isRequired,
	onUserRemove: PropTypes.func.isRequired,
};
