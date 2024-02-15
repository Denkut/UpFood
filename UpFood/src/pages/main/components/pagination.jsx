export const Pagination = ({ setPage, page, lastPage }) => {
	return (
		<div className="mt-8 flex items-center justify-center">
			<button
				className="mr-2 rounded bg-emerald-500 px-4 py-2 text-white focus:outline-none disabled:bg-gray-300 disabled:text-gray-500"
				disabled={page === 1}
				onClick={() => setPage(1)}
			>
				В начало
			</button>
			<button
				className="mr-2 rounded bg-emerald-500 px-4 py-2 text-white focus:outline-none disabled:bg-gray-300 disabled:text-gray-500"
				disabled={page === 1}
				onClick={() => setPage(page - 1)}
			>
				Предыдущая
			</button>
			<div className="mr-2">Страница: {page}</div>
			<button
				className="mr-2 rounded bg-emerald-500 px-4 py-2 text-white focus:outline-none disabled:bg-gray-300 disabled:text-gray-500"
				disabled={page === lastPage}
				onClick={() => setPage(page + 1)}
			>
				Следующая
			</button>
			<button
				className="rounded bg-emerald-500 px-4 py-2 text-white focus:outline-none disabled:bg-gray-300 disabled:text-gray-500"
				disabled={page === lastPage}
				onClick={() => setPage(lastPage)}
			>
				В конец
			</button>
		</div>
	);
};
