import { useState, useEffect } from 'react';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import ProfileMenu from '../../components/profile-menu/profile-menu';
import style from './order-page.module.css';

export default function OrderPage() {

    const dispatch = useDispatch();

    const [state, setState] = useState({
        name: '',
        email: '',
        password: ''
    });


    return (
        <div className={style.center}>
            <div className={style.app}>

                <div className={style.col1}>
                    <ProfileMenu />
                </div>
                <div className={style.col2}>
                    <div className={style.container}>
                        <form >
                            <div className='pb-6'>
                            Тут будет информация по заказу
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        </div>
    );
}