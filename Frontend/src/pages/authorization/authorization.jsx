import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Input } from "../../components";
import { selectUserRole } from "../../selectors";
import { ROLE } from "../../constants";
import { setCart, setUser } from "../../actions";
import { useResetForm } from "../../hooks";
import { request } from "../../utils";

export const authFormSchema = yup.object().shape({
  login: yup
    .string()
    .required("Заполните логин")
    .matches(/^\w+$/, "Неверно заполнен логин.")
    .min(3, "Неверно заполнен логин. Минимум 3 символа.")
    .max(15, "Неверно заполнен логин. Максимум 15 символов."),

  password: yup
    .string()
    .required("Заполните пароль")
    .matches(
      /^[\w#%]+$/,
      "Неверно заполнен пароль. Допускаются буквы, цифры и символы # %"
    )
    .min(6, "Неверный пароль. Минимум 6 символов.")
    .max(30, "Неверный пароль. Максимум 30 символов."),
});

export const Authorization = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      login: "",
      password: "",
    },
    resolver: yupResolver(authFormSchema),
  });

  const [serverError, setServerError] = useState(null);

  const dispatch = useDispatch();

  const roleId = useSelector(selectUserRole);

  useResetForm(reset);

  const onSubmit = ({ login, password }) => {
    request("/login", "POST", { login, password }).then(({ error, user }) => {
      if (error) {
        setServerError(`Ошибка запроса: ${error}`);
        return;
      }
      dispatch(setUser(user));
      sessionStorage.setItem("userData", JSON.stringify(user));
      if (
        (user.cart && user.cart.meals && user.cart.meals.length) ||
        (user.cart && user.cart.rations && user.cart.rations.length)
      ) {
        dispatch(setCart(user.cart));
      }
    });
  };

  const formError = errors?.login?.message || errors?.password?.message;
  const errorMessage = formError || serverError;

  if (roleId !== ROLE.GUEST) {
    return <Navigate to="/" />;
  }

  return (
    <div className="m-auto flex w-full max-w-xs items-center justify-center">
      <form
        className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-4">
          <Input
            label="Имя пользователя"
            type="text"
            placeholder="Логин..."
            error={errors.login}
            {...register("login")}
            onChange={() => setServerError(null)}
          />
        </div>

        <div className="mb-6">
          <Input
            label="Пароль"
            type="password"
            placeholder="Пароль..."
            error={errors.password}
            {...register("password")}
            onChange={() => setServerError(null)}
          />
        </div>
        {errorMessage && (
          <div className="mb-6 text-xs italic text-red-500">{errorMessage}</div>
        )}

        <div className="mb-6 flex items-center justify-between">
          <Button type="submit" disabled={!!formError}>
            Авторизоваться
          </Button>
          <Link
            className="ml-6 inline-block align-baseline text-sm font-bold text-blue-500 hover:text-blue-800"
            to="/"
          >
            Забыли пароль?
          </Link>
        </div>
        <Button>
          <Link to="/register" className="text-white">
            Регистрация
          </Link>
        </Button>
      </form>
    </div>
  );
};
