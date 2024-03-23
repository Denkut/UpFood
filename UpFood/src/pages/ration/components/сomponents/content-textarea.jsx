import React from 'react';

export const ContentTextarea = ({ content, onContentChange }) => {
	return (
		<div className="mb-2 flex items-center text-lg">
			<span className="mr-2 items-center text-xl font-semibold text-emerald-900">
				Контент:
			</span>
			<textarea
				value={content}
				onChange={onContentChange}
				className="focus:shadow-outline w-full rounded-md border px-3 py-2 focus:outline-none"
				rows="3"
			/>
		</div>
	);
};
