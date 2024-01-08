export const Button = ({ children, ...props }) => {
	return (
	  <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-6" {...props}>
		{children}
	  </button>
	);
  };
  