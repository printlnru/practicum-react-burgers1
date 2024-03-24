
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import style from './app-header.module.css';

export default function AppHeader() {

    return (
        <div className={style.app_header_center}>
            <nav className={style.app_header}>

                <div className={style.col1}>
                    <a className={style.app_header_btn} >
                        <BurgerIcon type="primary" />
                        <span className="text text_type_main-default pl-2">Конструктор</span>
                    </a>
                    <a className={style.app_header_btn}>
                        <ListIcon type="primary" />
                        <span className="text text_type_main-default pl-2">Лента заказов</span>
                    </a>
                </div>
                <div className={style.col2}>
                    <Logo />
                </div>
                <div className={style.col3}>
                    <a className={style.app_header_btn}>
                        <ProfileIcon type="primary" />
                        <span className="text text_type_main-default pl-2">Личный кабинет</span>
                    </a>
                </div>
            </nav >
        </div>
    )
}