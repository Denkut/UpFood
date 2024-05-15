import PropTypes from "prop-types";

export const RationDescription = ({
  ration,
  goals,
}) => {
  const goal = goals[0].goal.find((item) => item.id === ration.goal);

  const goalName = goal ? goal.name : "Цель не указана";

  return (
    <div className="ml-5 items-center">
      <div className="flex">
        <span className="mr-2 items-center text-xl font-semibold text-emerald-900">
          Цель:
        </span>
        <span className="mr-2 flex items-center text-lg">{goalName}</span>
      </div>
      <div className="flex">
        <span className="mr-2 items-center text-xl font-semibold text-emerald-900">
          Контент:
        </span>
        <div className="mr-2 flex items-center text-lg">
          <p>{ration.content}</p>
        </div>
      </div>
    </div>
  );
};

RationDescription.propTypes = {
  ration: PropTypes.object.isRequired,
};
