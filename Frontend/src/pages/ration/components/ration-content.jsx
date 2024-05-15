import PropTypes from "prop-types";
import {
  PencilSquareIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { selectUserRole } from "../../../selectors";
import { Link, useNavigate } from "react-router-dom";
import { CLOSE_MODAL, openModal, removeRationAsync } from "../../../actions";
import { checkAccess } from "../../../utils";
import { AddToCartButton, Modal } from "../../../components";
import { getMealImage, getMealTitle } from "./utils";
import { ROLE } from "../../../constants";

export const RationContent = ({ ration, meals, types, goals }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userRole = useSelector(selectUserRole);
  const onMealRemove = (id) => {
    dispatch(
      openModal({
        text: "Удалить рацион?",
        onConfirm: () => {
          dispatch(removeRationAsync(id)).then(() => {
            navigate("/rations");
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
      <div className="ml-8 flex flex-col">
        <div className="flex">
          {isAdmin && (
            <>
              <PencilSquareIcon
                onClick={() => navigate(`/ration/${ration.id}/edit`)}
                className="block h-6 w-6 cursor-pointer rounded-lg text-base font-semibold leading-7 text-gray-900 hover:text-emerald-900"
              />
              <>
                <TrashIcon
                  onClick={() => onMealRemove(ration.id)}
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

        <h2 className="mt-2 max-w-72  text-3xl font-semibold">
          {ration.title}
        </h2>
        {ration.image && (
          <img
            src={ration.image}
            alt={ration.title}
            className="my-2 h-32 w-32 rounded-md object-cover object-center"
          />
        )}
        <div className="mb-2 flex items-center text-gray-500">
          <div className="mr-2 text-base  text-emerald-700">
            {(ration.goal &&
              goals[0].goal.find((goal) => goal.id === ration.goal)?.name) ||
              "Цель не найдена"}
          </div>
          <span className="mr-2">
            {<span className="mr-2">{ration.totalCalories || ""} ккал.</span>}{" "}
          </span>
        </div>

        {types.length > 0 && (
          <div className="flex flex-wrap">
            {ration.meals &&
              ration.meals.map((item, id) => (
                <div key={id} className="mb-4">
                  <div className="mx-auto mr-6 flex h-full w-96 transform flex-col overflow-hidden rounded-xl shadow-lg transition duration-300 hover:scale-105 hover:shadow-xl">
                    <h3 className="m-2 text-xl font-bold">
                      {
                        types[0].type.find((type) => type.id === item.type)
                          ?.name
                      }
                    </h3>
                    <Link
                      className="flex h-full flex-col"
                      to={`/meal/${item.id}`}
                    >
                      <img
                        src={getMealImage({
                          meals,
                          mealId: item.id,
                        })}
                        alt={getMealTitle({
                          meals,
                          mealId: item.id,
                        })}
                        className="h-48 w-full object-cover object-center p-4"
                      />
                      <p className="text-center">
                        {getMealTitle({
                          meals,
                          mealId: item.id,
                        })}
                      </p>
                      <p className="text-center">Количество: {item.quantity}</p>
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        )}

        <div className="m-4 text-3xl font-bold text-gray-900">
          {ration.totalPrices} ₽
        </div>
        {userRole !== ROLE.GUEST && (
          <AddToCartButton
            itemId={ration.id}
            itemType="ration"
            className="w-56  rounded-full bg-amber-800   px-4 py-2 font-bold text-white hover:bg-amber-700 focus:outline-none"
          />
        )}
      </div>
      <Modal />
    </div>
  );
};

RationContent.propTypes = {
  meals: PropTypes.array.isRequired,
  ration: PropTypes.object.isRequired,
};
