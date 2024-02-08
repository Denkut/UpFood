import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export const Search = ({ searchPhrase, onChange, className }) => {
	return (
		<div className={`mt-8 ${className}`}>
			<div className="relative">
				<input
					type="text"
					placeholder="Поиск..."
					className="focus:shadow-outline block w-full appearance-none rounded-full border border-gray-300 bg-white px-4 py-2 leading-normal focus:outline-none"
					value={searchPhrase}
					onChange={onChange}
				/>
				<div className="absolute right-0 top-0 mr-4 mt-3">
					<MagnifyingGlassIcon className="text-gray-600" />
				</div>
			</div>
		</div>
	);
};
