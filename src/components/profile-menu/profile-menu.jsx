
import { Link, Redirect, useLocation, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import styles from './profile-menu.module.css';

import { logoutAct } from '../../services/actions/auth';

export default function ProfileMenu() {

    const { pathname } = useLocation();
    const dispatch = useDispatch();

    const handleExit = () => {
        dispatch(logoutAct());
    }

    return (
        <nav className={styles.menu}>

            <NavLink to="/profile"
                className={({ isActive }) => isActive ? styles.link_active + " text_type_main-medium text_color_inactive" : styles.link + " text_type_main-medium text_color_inactive"}>
                <span className='ml-2 pu-5 pb-5'>Профиль</span>
            </NavLink>

            <NavLink to="/profile/orders"
                className={({ isActive }) => isActive ? styles.link_active + " text_type_main-medium text_color_inactive" : styles.link + " text_type_main-medium text_color_inactive"}>
                <span className='ml-2 pu-5 pb-5'>История заказов</span>
            </NavLink>

            <NavLink to="/login"
                className={({ isActive }) => isActive ? styles.link_active + " text_type_main-medium text_color_inactive" : styles.link + " text_type_main-medium text_color_inactive"}>
                <span className='ml-2 pu-5 pb-5' onClick={handleExit}>Выход</span>
            </NavLink>

            {pathname === '/profile' ? (
                <div className="pt-20 ml-2 text_type_main-default text_color_inactive">
                    В этом разделе вы можете изменить свои персональные данные
                </div>
            ) : null}
        </nav>
    );
}