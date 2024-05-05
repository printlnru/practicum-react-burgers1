import { useState, useEffect } from 'react';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import ProfileMenu from './profile-menu';
import style from './profile-page.module.css';

import { getUserInfoAct, updateUserAct } from '../services/actions/auth';



export default function ProfilePage() {

    const dispatch = useDispatch();

    const { user } = useSelector(store => store.auth);

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
        dispatch(updateUserAct(state));
    }

    const handleReset = (e) => {
        setState({
            ...state,
            name: user.name,
            email: user.email,
            password: ''
        });
    }

    useEffect(() => {
        dispatch(getUserInfoAct())
    }, []);

    useEffect(() => {
        setState({
            ...state,
            name: user.name,
            email: user.email
        });
    }, [user]);


    return (
        <div className={style.center}>
            <div className={style.app}>
                <div className={style.col1}>
                    <ProfileMenu />
                </div>
                <div className={style.col2}>
                    <div className={style.container}>
                        <form onSubmit={handleSubmit} onReset={handleReset}>
                            <div className='pb-6'>
                                <Input type={"text"} icon="EditIcon" placeholder={"Имя"} name={"name"} value={state.name} onChange={handleChange} />
                            </div>

                            <div className='pb-6'>
                                <Input type={"email"} icon="EditIcon" placeholder={"Логин"} name={"email"} value={state.email} onChange={handleChange} />
                            </div>

                            <div className='pb-6'>
                                <Input type={"password"} icon="EditIcon" placeholder={"Пароль"} name={"password"} value={state.password} onChange={handleChange} />
                            </div>

                            {/* на дизайне кнопок нет, а по тексту описания они должны быть */}
                            <Button htmlType="submit" type="primary" size="medium" style={{ margin: '10px' }}>Сохранить</Button>
                            <Button htmlType="reset" type="primary" size="medium" style={{ margin: '10px' }}>Отменить</Button>
                        </form>
                    </div>
                </div>
            </div >
        </div>
    );
}