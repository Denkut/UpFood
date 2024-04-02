import PropTypes from 'prop-types';

export const TableRow = ({ children }) => (
	<div className={`flex min-w-[200px] max-w-6xl items-center justify-center`}>
		{children}
	</div>
);

TableRow.propTypes = {
	children: PropTypes.node.isRequired,
};
