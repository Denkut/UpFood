import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { server } from '../../bff';
import { Button, Input } from '../../components';
import { useResetForm } from '../../hooks';
import { setUser } from '../../actions';
import { selectUserRole } from '../../selectors';
import { ROLE } from '../../constants';

const regFormSchema = yup.object().shape({
	login: yup
		.string()
		.required('Заполните логин')
		.matches(/^\w+$/, 'Неверно заполнен логин.')
		.min(3, 'Неверно заполнен логин. Минимум 3 символа.')
		.max(15, 'Неверно заполнен логин. Максимум 15 символов.'),

	password: yup
		.string()
		.required('Заполните пароль')
		.matches(
			/^[\w#%]+$/,
			'Неверно заполнен пароль. Допускаются буквы, цифры и символы # %',
		)
		.min(6, 'Неверный логин. Минимум 6 символов.')
		.max(30, 'Неверный логин. Максимум 30 символов.'),

	passcheck: yup
		.string()
		.required('Заполните повтор пароля')
		.oneOf([yup.ref('password'), null], 'Пароли не совпадают'),
});

export const Registration = () => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
			passcheck: '',
		},
		resolver: yupResolver(regFormSchema),
	});

	const [serverError, setServerError] = useState(null);

	const dispatch = useDispatch();

	const roleId = useSelector(selectUserRole);

	useResetForm(reset);

	const onSubmit = ({ login, password }) => {
		server.register(login, password).then(({ error, res }) => {
			if (error) {
				setServerError(`Ошибка запроса: ${error}`);
				return;
			}

			dispatch(setUser(res));
			// sessionStorage.setItem('userData', JSON.stringify(res));
		});
	};

	const formError =
		errors?.login?.message ||
		errors?.password?.message ||
		errors?.passcheck?.message;

	const errorMessage = formError || serverError;

	if (roleId !== ROLE.GUEST) {
		return <Navigate to="/" />;
	}

	return (
		<div className="m-auto w-full max-w-xs items-center justify-center">
			<form
				className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md"
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className="mb-4">
					<label
						htmlFor="login"
						className="mb-2 block text-sm font-bold text-gray-700"
					>
						Логин:
					</label>
					<Input
						type="text"
						placeholder="Логин..."
						{...register('login', {
							onChange: () => setServerError(null),
						})}
					/>
				</div>

				<div className="mb-4">
					<label
						htmlFor="password"
						className="mb-2 block text-sm font-bold text-gray-700"
					>
						Пароль:
					</label>
					<Input
						type="password"
						placeholder="Пароль..."
						{...register('password', {
							onChange: () => setServerError(null),
						})}
					/>
				</div>

				<div className="mb-4">
					<label
						htmlFor="passcheck"
						className="mb-2 block text-sm font-bold text-gray-700"
					>
						Проверка пароля:
					</label>
					<Input
						type="password"
						placeholder="Проверка пароля..."
						{...register('passcheck', {
							onChange: () => setServerError(null),
						})}
					/>
				</div>

				<div className="flex items-center justify-center">
					<Button type="submit" disabled={!!formError}>
						Зарегистрироваться
					</Button>
				</div>
				{errorMessage && (
					<div className="mb-6 text-xs italic text-red-500">
						{errorMessage}
					</div>
				)}
			</form>
		</div>
	);
};
