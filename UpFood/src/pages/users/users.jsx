import { useEffect, useState } from 'react';
import { ROLE } from '../../constants';
import { Content } from '../../components';
import { TableRow, UserRow } from './components';
import { useServerRequest } from '../../hooks';
import { useSelector } from 'react-redux';
import { selectUserRole } from '../../selectors';
import { checkAccess } from '../../utils';

export const Users = () => {
	const [users, setUsers] = useState([]);
	const [roles, setRoles] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);
	const [shouldUpdateUserList, setShouldUpdateUserList] = useState(false);
	const userRole = useSelector(selectUserRole);

	const requestServer = useServerRequest();

	useEffect(() => {
		if (!checkAccess([ROLE.ADMIN], userRole)) {
			return;
		}

		Promise.all([
			requestServer('fetchUsers'),
			requestServer('fetchRoles'),
		]).then(([usersRes, rolesRes]) => {
			if (usersRes.error || rolesRes.error) {
				setErrorMessage(usersRes.error || rolesRes.error);
				return;
			}

			setUsers(usersRes.res);
			setRoles(rolesRes.res);
		});
	}, [requestServer, shouldUpdateUserList, userRole]);

	const onUserRemove = userId => {
		if (!checkAccess([ROLE.ADMIN], userRole)) {
			return;
		}

		requestServer('removeUser', userId).then(() => {
			setShouldUpdateUserList(!shouldUpdateUserList);
		});
	};

	return (
		<div>
			<Content error={errorMessage}>
				<h2 className="mb-10 flex items-center justify-center text-xl font-semibold">
					Пользователи
				</h2>
				<div className=" bg-slate-400">
					<TableRow>
						<div className=" mx-[210px]  min-w-[70px] py-2 font-bold">
							Логин
						</div>
						<div className=" mr-[180px]  min-w-[70px]  font-bold">
							Дата регистрации
						</div>
						<div className="min-w-[50px] font-bold ">Роль</div>
					</TableRow>
					{users.map(({ id, login, registeredAt, roleId }) => (
						<UserRow
							key={id}
							id={id}
							login={login}
							registeredAt={registeredAt}
							roleId={roleId}
							roles={roles.filter(
								({ id: roleId }) => roleId !== ROLE.GUEST,
							)}
							onUserRemove={() => onUserRemove(id)}
						/>
					))}
				</div>
			</Content>
		</div>
	);
};
