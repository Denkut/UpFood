export const Content = ({ children, error }) =>
	error ? (
		<div>
			<h2>Ошибка</h2>
			<div>{error}</div>
		</div>
	) : (
		children
	);
