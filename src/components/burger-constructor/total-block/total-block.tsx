import { useMemo } from 'react'

import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'

import style from './total-block.module.css';

import {Modal} from '../../modal/modal';
import OrderDetails from '../../order-details/order-details';

import { ORDER_CREATE, ORDER_CLOSE } from '../../../services/actions/order';

import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../..';
import { TIngredient } from '../../../utils/types';

export default function TotalBlock() {

    const dispatch = useAppDispatch();

    const { bun, ingredients } = useAppSelector(store => store.construct);
    const visible = useAppSelector(store => store.order.ingredients?.length || 0 > 0);
    const { login } = useAppSelector(store => store.auth);
    const navigate = useNavigate();

    const disabledButton = !bun || ingredients.length == 0;

    const totalCost = useMemo(() => {
        const doubleBunCost: number = bun ? bun.price * 2 : 0;

        //const ingridientsCost : number = ingredients.reduce((a : number, b : TIngredient) => a as number + ( (b as TIngredient).price),0);
        var ingridientsCost : number = 0;
        ingredients.forEach(e   => {
            ingridientsCost += e.price;
        });
        return doubleBunCost + ingridientsCost;
    }, [bun, ingredients])

    const onClickBtn = () => {
        if (!login) {
            navigate('/login');
        }

        else {
            const value = []
            value.push(bun._id);
            ingredients.forEach(e => {
                value.push(e._id);
            });
            value.push(bun._id);

            dispatch({ type: ORDER_CREATE, ingredients:value })
        }
    }

    const closeModalHandle = () => {
        dispatch({ type: ORDER_CLOSE })
    }

    return (
        <div className={style.order}>
            <span className="text text_type_digits-medium">{totalCost}</span>

            <div className={style.currencyicon} ><CurrencyIcon type="primary" /></div>
            <Button disabled={disabledButton} onClick={onClickBtn} htmlType="button" type="primary" size="large" extraClass="ml-10">{
                disabledButton ? 'Выбери булочку и что-нибудь ещё' : 'Оформить заказ'
            }</Button>

            {visible &&
                <Modal onCloseHandle={closeModalHandle}>
                    <OrderDetails />
                </Modal>}

        </div>
    )
}