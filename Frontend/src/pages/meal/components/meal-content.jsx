import {
  PencilSquareIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { selectUserRole } from "../../../selectors";
import { useNavigate } from "react-router-dom";
import { CLOSE_MODAL, openModal, removeMealAsync } from "../../../actions";
import { checkAccess } from "../../../utils";
import { AddToCartButton, Modal } from "../../../components";
import { PROP_TYPE, ROLE } from "../../../constants";

export const MealContent = ({ meal, diets, types }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userRole = useSelector(selectUserRole);

  const onMealRemove = (id) => {
    dispatch(
      openModal({
        text: "Удалить блюдо?",
        onConfirm: () => {
          dispatch(removeMealAsync(id)).then(() => {
            navigate(-1);
          });
          dispatch(CLOSE_MODAL);
        },
        onCancel: () => dispatch(CLOSE_MODAL),
      })
    );
  };

  const isAdmin = checkAccess([ROLE.ADMIN], userRole);

  return (
    <div className="mb-6 flex rounded-md bg-white p-6 shadow-lg">
      <div className="flex-shrink-0">
        <img
          src={meal.imageUrl}
          alt={meal.title}
          className="mb-4 h-[400px] w-[400px] rounded-md object-cover"
        />
      </div>
      <div className="ml-8 flex flex-col">
        <div className="flex">
          {isAdmin && (
            <>
              <PencilSquareIcon
                onClick={() => navigate(`/meal/${meal.id}/edit`)}
                className="block h-6 w-6 cursor-pointer rounded-lg text-base font-semibold leading-7 text-gray-900 hover:text-emerald-900"
              />
              <>
                <TrashIcon
                  onClick={() => onMealRemove(meal.id)}
                  className="ml-2 block h-6 w-6 cursor-pointer rounded-lg text-base font-semibold leading-7 text-gray-900 hover:text-red-800"
                />
                <XMarkIcon
                  onClick={() => navigate(-1)}
                  className="ml-64 h-6 w-6 cursor-pointer rounded-lg text-base font-semibold leading-7 text-gray-900 hover:text-gray-400"
                />
              </>
            </>
          )}
        </div>

        <h2 className="mt-2 max-w-72  text-3xl font-semibold">{meal.title}</h2>
        <div className="mb-2 flex items-center text-gray-500">
          <div className="mr-2 text-base  text-emerald-700">
            {(meal.type &&
              types[0].type.find((type) => type.id === meal.type)?.name) ||
              "Тип не найден"}
          </div>
          <span className="mr-2">{meal.calories} ккал.</span>
        </div>

        <div className="mb-2 flex items-center text-red-900">
          <span className="mr-2">
            {" "}
            {(meal.diet &&
              diets[0].diet.find((diet) => diet.id === meal.diet)?.name) ||
              "Диета не найдена"}
          </span>
        </div>
        <div className="mb-2 text-3xl font-bold text-gray-900">
          {meal.price} ₽
        </div>
        {userRole !== ROLE.GUEST && (
          <AddToCartButton
            itemId={meal.id}
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
