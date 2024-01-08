import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector, useStore } from 'react-redux';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { server } from '../../bff';
import { Button, Input } from '../../components';
import { useResetForm } from '../../hooks';
import { selectUserRole } from '../../selectors';
import { ROLE } from '../../constants';
import { setUser } from '../../actions';



export const authFormSchema = yup.object().shape({
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
		.min(6, 'Неверный пароль. Минимум 6 символа.')
		.max(30, 'Неверный пароль. Максимум 30 символов.'),
});


export const Authorization = () => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
		},
		resolver: yupResolver(authFormSchema),
	});

	const [serverError, setServerError] = useState(null);

	const dispatch = useDispatch();
	const store = useStore();

	const roleId = useSelector(selectUserRole);

	useEffect(() => {
		let currentWasLogout = store.getState().app.wasLogout;

		return store.subscribe(() => {
			let previosWasLogout = currentWasLogout;
			currentWasLogout = store.getState().app.wasLogout;

			if (currentWasLogout !== previosWasLogout) {
				reset();
			}
		});
	}, [reset, store]);

	const onSubmit = ({ login, password }) => {
		server.authorize(login, password).then(({ error, res }) => {
			if (error) {
				setServerError(`Ошибка запроса: ${error}`);
				return;
			}

			dispatch(setUser(res));
		});
	};

	const formError = errors?.login?.message || errors?.password?.message;
	const errorMessage = formError || serverError;

	if (roleId !== ROLE.GUEST) {
		return <Navigate to="/" />;
	}

	return (
		<div className="w-full max-w-xs items-center justify-center m-auto">
		
			<form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
             onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
				<Input 
                           label='Имя пользователя'
						   type="login"
						   placeholder="Логин..."
						   error={errors.login}
						   {...register('login')}
						   onChange={() => setServerError(null)}
                
				/>
                </div>

                <div className="mb-6">
				<Input  
                          label='Пароль'
						  type="password"
						  placeholder="Пароль..."
						  error={errors.password}
						  {...register('password')}
						  onChange={() => setServerError(null)}
				/>
                </div>
                {errorMessage && <div className="mb-6 text-red-500 text-xs italic">{errorMessage}</div>}
				
                <div className="flex items-center justify-between mb-6">
				<Button type="submit" disabled={!!formError}>
					Авторизоваться
				</Button>
                <Link className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" to="/" >
                    Забыли пароль?
                </Link>
                </div>
				<Button>
				<Link to="/register" className='text-white'>Регистрация</Link>
				</Button>
			
			</form>
		</div>
	);
};

