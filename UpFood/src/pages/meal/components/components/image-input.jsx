import React from 'react';

export const ImageInput = ({ imageUrl, onImageUrlChange }) => {
	return (
		<div>
			<img
				src={imageUrl}
				alt="Meal"
				className="mb-4 h-[400px] w-[400px] rounded-md object-cover"
			/>
			<label className="mt-2 block text-sm font-medium text-gray-700">
				Ссылка на фото:
				<input
					type="text"
					value={imageUrl}
					placeholder="Изображение..."
					onChange={e => onImageUrlChange(e.target.value)}
					className="mt-1 w-full rounded-md border p-2"
				/>
			</label>
		</div>
	);
};
