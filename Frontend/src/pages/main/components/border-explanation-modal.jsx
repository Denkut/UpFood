import PropTypes from "prop-types";

export const BorderExplanationModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="max-w-md rounded-lg bg-white p-8">
        <h2 className="mb-4 text-lg font-bold">Цвета границ</h2>
        <div className="mb-4 text-gray-700">
          <p>
            <span className="text-red-700">Красные границы</span> указывают на
            то, что этот рацион содержит ингредиенты, на которые у вас есть
            аллергия.
          </p>
          <hr />
          <p>
            <span className="text-emerald-700">Зеленые границы</span> указывают
            на то, что этот рацион соответствует вашей цели питания.
          </p>
        </div>
        <button
          className="rounded bg-red-700 px-4 py-2 font-bold text-white hover:bg-red-600"
          onClick={onClose}
        >
          Закрыть
        </button>
      </div>
    </div>
  );
};

BorderExplanationModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
