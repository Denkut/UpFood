
import {
	ArrowLeftEndOnRectangleIcon,
	ShoppingCartIcon,
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { ROLE } from '../../../constants';
import { useSelector } from 'react-redux';
import { selectUserLogin, selectUserRole } from '../../../selectors';

export const HeaderMobile = ({ navigation, onLogout }) => {
	const roleId = useSelector(selectUserRole);
	const login = useSelector(selectUserLogin);

	return (
	
	);
};
