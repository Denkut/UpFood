import { Icon } from '../../../../../../components';
import { useDispatch } from 'react-redux';
import { removeCommentAsync } from '../../../../../../actions';
import { useServerRequest } from '../../../../../../hooks';
import styled from 'styled-components';

const CommentContainer = ({ className, postId, id, author, content, publishedAt }) => {
	const dispatch = useDispatch();
	const requestServer = useServerRequest();
	const onCommentRemove = (id) => {
		dispatch(removeCommentAsync(requestServer, postId, id));
	};

	return (
		<div className={className}>
			<div className="comment">
				<div className="information-panel">
					<div className="author">
						<Icon
							id="fa-user-circle-o "
							size="18px"
							margin="0 6px 0 0"
							onClick={() => {}}
						/>
						{author}
					</div>
					<div className="published-at">
						<Icon
							id="fa-calendar-o "
							size="18px"
							margin="0 6px 0 0"
							onClick={() => {}}
						/>
						{publishedAt}
					</div>
				</div>
				<div className="comment-text">{content}</div>
			</div>
			<Icon
				id="fa-trash-o "
				size="21px"
				margin="0  0 0 10px"
				onClick={() => onCommentRemove(id)}
			/>
		</div>
	);
};

export const Comment = styled(CommentContainer)`
	display: flex;
	margin-top: 10px;
	& .comment {
		width: 550px;
		padding: 5px 10px;
		border: 1px solid #000;
	}

	& .information-panel {
		display: flex;
		justify-content: space-between;
	}

	& .author {
		display: flex;
	}

	& .published-at {
		display: flex;
	}
`;
