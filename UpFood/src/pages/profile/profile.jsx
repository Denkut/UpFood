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

	fullName: yup
		.string()
		.required('Заполните ФИО')
		.matches(/^[\w\s]+$/, 'Неверно заполнено ФИО.')
		.max(50, 'Максимальная длина 50 символов.'),

	weight: yup
		.number()
		.typeError('Введите корректный вес')
		.positive('Вес должен быть положительным числом')
		.integer('Вес должен быть целым числом')
		.min(10, 'Минимальный вес - 10 кг'),

	goal: yup
		.string()
		.required('Заполните цель')
		.max(100, 'Максимальная длина 100 символов.'),

	height: yup
		.number()
		.typeError('Введите корректный рост')
		.positive('Рост должен быть положительным числом')
		.integer('Рост должен быть целым числом')
		.min(100, 'Минимальный рост - 100 см'),

	age: yup
		.number()
		.typeError('Введите корректный возраст')
		.positive('Возраст должен быть положительным числом')
		.integer('Возраст должен быть целым числом')
		.min(6, 'Минимальный возраст - 6 лет'),

	email: yup
		.string()
		.required('Заполните email')
		.email('Введите корректный email')
		.max(100, 'Максимальная длина 100 символов.'),

	dietPreferences: yup.string(),

	allergies: yup.string(),
});

export const Profile = () => {
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
			fullName: '',
			weight: '',
			goal: '',
			height: '',
			age: '',
			email: '',
			dietPreferences: '',
			allergies: '',
		},
		resolver: yupResolver(regFormSchema),
	});

	const [serverError, setServerError] = useState(null);

	const dispatch = useDispatch();

	const roleId = useSelector(selectUserRole);

	useResetForm(reset);

	const onSubmit = ({
		login,
		password,
		fullName,
		weight,
		goal,
		height,
		age,
		email,
		dietPreferences,
		allergies,
	}) => {
		server
			.register(
				login,
				password,
				fullName,
				age,
				email,
				weight,
				height,
				goal,
				dietPreferences,
				allergies,
			)
			.then(({ error, res }) => {
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
		errors?.passcheck?.message ||
		errors?.fullName?.message ||
		errors?.weight?.message ||
		errors?.goal?.message ||
		errors?.height?.message ||
		errors?.age?.message ||
		errors?.email?.message ||
		errors?.dietPreferences?.message ||
		errors?.allergies?.message;

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
						htmlFor="fullName"
						className="mb-2 block text-sm font-bold text-gray-700"
					>
						ФИО:
					</label>
					<Input
						type="text"
						placeholder="ФИО..."
						{...register('fullName', {
							onChange: () => setServerError(null),
						})}
					/>
				</div>

				<div className="mb-4">
					<label
						htmlFor="weight"
						className="mb-2 block text-sm font-bold text-gray-700"
					>
						Вес в кг.:
					</label>
					<Input
						type="number"
						placeholder="Вес..."
						{...register('weight', {
							onChange: () => setServerError(null),
							min: 10,
						})}
					/>
				</div>

				<div className="mb-4">
					<label
						htmlFor="height"
						className="mb-2 block text-sm font-bold text-gray-700"
					>
						Рост в см.:
					</label>
					<Input
						type="number"
						placeholder="Рост..."
						{...register('height', {
							onChange: () => setServerError(null),
							min: 100,
						})}
					/>
				</div>

				<div className="mb-4">
					<label
						htmlFor="age"
						className="mb-2 block text-sm font-bold text-gray-700"
					>
						Возраст:
					</label>
					<Input
						type="number"
						placeholder="Возраст..."
						{...register('age', {
							onChange: () => setServerError(null),
							min: 6,
						})}
					/>
				</div>

				<div className="mb-4">
					<label
						htmlFor="email"
						className="mb-2 block text-sm font-bold text-gray-700"
					>
						Email:
					</label>
					<Input
						type="text"
						placeholder="Email..."
						{...register('email', {
							onChange: () => setServerError(null),
						})}
					/>
				</div>
				<div className="mb-4">
					<label
						htmlFor="goal"
						className="mb-2 block text-sm font-bold text-gray-700"
					>
						Цель:
					</label>
					<select
						id="goal"
						name="goal"
						className={`focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none ${
							errors.goal ? 'border-red-500' : ''
						}`}
						{...register('goal', {
							onChange: () => setServerError(null),
						})}
					>
						<option value="">Выберите цель</option>
						<option value="похудеть">Похудеть</option>
						<option value="набрать вес">Набрать вес</option>
						<option value="поддерживать форму">
							Поддерживать форму
						</option>
					</select>
				</div>
				<div className="mb-4">
					<label
						htmlFor="dietPreferences"
						className="mb-2 block text-sm font-bold text-gray-700"
					>
						Предпочтения в диете:
					</label>
					<Input
						type="text"
						placeholder="Предпочтения в диете..."
						{...register('dietPreferences', {
							onChange: () => setServerError(null),
						})}
					/>
				</div>

				<div className="mb-4">
					<label
						htmlFor="allergies"
						className="mb-2 block text-sm font-bold text-gray-700"
					>
						Аллергии:
					</label>
					<Input
						type="text"
						placeholder="Аллергии..."
						{...register('allergies', {
							onChange: () => setServerError(null),
						})}
					/>
				</div>
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
