export const Button = ({ children, ...props }) => {
	return (
		<button
			className="focus:shadow-outline rounded bg-emerald-600 px-4 py-2 font-bold text-white hover:bg-emerald-700 focus:outline-none"
			{...props}
		>
			{children}
		</button>
	);
};
