
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { NavLink } from 'react-router-dom';
import style from './app-header.module.css';

export default function AppHeader() {

    return (
        <header className={style.app_header_center}>
            <nav className={style.app_header}>

                <div className={style.col1}>
                    <NavLink className={style.app_header_btn} to='/'>
                        <BurgerIcon type="primary" />
                        <span className="text_type_main-default pl-2">Конструктор</span>
                    </NavLink>
                    <NavLink className={style.app_header_btn}  to='/orders'>
                        <ListIcon type="primary" />
                        <span className="text_type_main-default pl-2">Лента заказов</span>
                    </NavLink>
                </div>
                <div className={style.col2}>
                    <Logo />
                </div>
                <div className={style.col3}>
                    <NavLink className={style.app_header_btn} to='/profile' >
                        <ProfileIcon type="primary" />
                        <span className="text_type_main-default pl-2">Личный кабинет</span>
                    </NavLink>
                </div>
            </nav >
            
        </header>
        
    )
}