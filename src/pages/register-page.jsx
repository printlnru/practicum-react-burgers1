import { useState, useEffect } from 'react';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect, useHistory, useLocation, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import styles from './login-page.module.css';

import { registrationAct } from '../services/actions/auth';

export default function RegisterPage() {

    const dispatch = useDispatch();
    const { login, error } = useSelector(store => store.auth);

    const [state, setState] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(registrationAct(state));
    };

    if (login) {
        return (
            <Navigate to={'/'} />
        );
    }


    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit}>
                <div className="text_type_main-medium pb-6">Регистрация</div>

                <div className='pb-6'>
                    <Input type={"text"} placeholder={"Имя"} onChange={handleChange} name={"name"} value={state.name} />
                </div>

                <div className='pb-6'>
                    <Input type={"email"} placeholder={"E-mail"} onChange={handleChange} name={"email"} value={state.email} />
                </div>

                <div className='pb-6'>
                    <PasswordInput onChange={handleChange} name={"password"} value={state.password} />
                </div>

                <Button htmlType="submit" type="primary" size="medium">Зарегистрироваться</Button>

                {
                    error && (<div>Что-то пошло не так...</div>)
                }

                <div className="text_type_main-default text_color_inactive pt-20">Уже зарегистрированы?
                    <Link to="/login" className="pl-2">Войти</Link>
                </div>
            </form>
        </div>
    );
}