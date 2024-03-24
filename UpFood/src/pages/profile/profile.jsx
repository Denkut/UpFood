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
import { selectUser, selectUserRole } from '../../selectors';
import { ROLE } from '../../constants';
import { dietCategories, goals, ingredients } from '../../bff/constants';

const profileFormSchema = yup.object().shape({
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

	goal: yup.number().required('Заполните цель'),

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

	dietCategory: yup.number().required('Заполните категорию диет'),

	allergenicIngredients: yup.array(),
});

export const Profile = () => {
	const user = useSelector(selectUser);
	const roleId = useSelector(selectUserRole);
	const [searchValue, setSearchValue] = useState('');

	const [serverError, setServerError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isSaved, setIsSaved] = useState(false);

	const dispatch = useDispatch();

	const saveUserDataToSessionStorage = userData => {
		sessionStorage.setItem('userData', JSON.stringify(userData));
	};

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			fullName: user.fullName ? user.fullName : '',
			weight: user.weight ? user.weight : '',
			goal: user.goal ? user.goal : '',
			height: user.height ? user.height : '',
			age: user.age ? user.age : '',
			email: user.email ? user.email : '',
			dietCategory: user.dietCategory ? user.dietCategory : '',
			allergenicIngredients: user.allergenicIngredients
				? user.allergenicIngredients
				: '',
		},
		resolver: yupResolver(profileFormSchema),
	});

	useResetForm(reset);

	const onSubmit = async data => {
		setIsLoading(true);

		server.updateUser(user, data).then(({ error, res }) => {
			setIsLoading(false);
			if (error) {
				setServerError(`Ошибка запроса: ${error}`);
				return;
			}
			dispatch(setUser(res));
			saveUserDataToSessionStorage(res);

			setIsSaved(true);
			setTimeout(() => setIsSaved(false), 3000);
		});
	};

	const formError =
		errors?.fullName?.message ||
		errors?.weight?.message ||
		errors?.goal?.message ||
		errors?.height?.message ||
		errors?.age?.message ||
		errors?.email?.message ||
		errors?.dietCategory?.message ||
		errors?.allergies?.message;

	const errorMessage = formError || serverError;

	if (roleId === ROLE.GUEST) {
		return <Navigate to="/" />;
	}

	const handleInputChange = e => {
		setSearchValue(e.target.value);
	};

	const filteredAllergies = ingredients.filter(allergy =>
		allergy.name.toLowerCase().includes(searchValue.toLowerCase()),
	);

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
						<option key="0" value="0" defaultValue="0">
							Не указано
						</option>
						{goals.map(item => {
							return (
								<option key={item.id} value={item.id}>
									{item.name}
								</option>
							);
						})}
					</select>
				</div>

				<div className="mb-4">
					<label
						htmlFor="goal"
						className="mb-2 block text-sm font-bold text-gray-700"
					>
						Категория диеты:
					</label>
					<select
						id="dietCategory"
						name="dietCategory"
						className={`focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none ${
							errors.goal ? 'border-red-500' : ''
						}`}
						{...register('dietCategory', {
							onChange: () => setServerError(null),
						})}
					>
						<option key="0" value="0" defaultValue="0">
							Не указано
						</option>
						{dietCategories.map(item => {
							return (
								<option key={item.id} value={item.id}>
									{item.name}
								</option>
							);
						})}
					</select>
				</div>

				<div className="mb-4">
					<span className="mr-2 items-center text-xl font-semibold text-emerald-900">
						Аллергии:
					</span>
					<input
						type="text"
						placeholder="Поиск аллергий..."
						className="mt-1 w-full rounded-md border p-2"
						value={searchValue}
						onChange={handleInputChange}
					/>
					<div
						className={`mt-1 h-40 w-full overflow-y-auto rounded-md border bg-white shadow-lg ${
							filteredAllergies.length > 0 ? 'visible' : 'hidden'
						}`}
					>
						{filteredAllergies.map(allergy => (
							<div key={allergy.id} className="mt-2">
								<label className="cursor-pointer text-center hover:bg-emerald-100">
									<input
										type="checkbox"
										name={`ingredient${allergy.id}`}
										id={`ingredient-${allergy.id}`}
										value={allergy.id}
										{...register('allergenicIngredients', {
											onChange: () =>
												setServerError(null),
										})}
									/>
									{allergy.name}
								</label>
							</div>
						))}
					</div>
				</div>

				<div className="flex items-center justify-center">
					<Button type="submit" disabled={!!formError || isLoading}>
						{isLoading ? 'Отправка...' : 'Сохранить изменения'}
					</Button>
				</div>
				{isSaved && (
					<div className="mt-1 text-center text-sm text-green-500">
						Изменения сохранены
					</div>
				)}
				{errorMessage && (
					<div className="mb-6 text-xs italic text-red-500">
						{errorMessage}
					</div>
				)}
			</form>
		</div>
	);
};
