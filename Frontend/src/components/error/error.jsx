import { PROP_TYPE } from '../../constants';

export const Error = ({ error }) =>
	error && (
		<div className="mb-4 bg-red-200 p-4 text-center text-red-800">
			<h2>Ошибка</h2>
			<div>{error}</div>
		</div>
	);

Error.propTypes = {
	error: PROP_TYPE.ERROR,
};
