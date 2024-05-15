import { useMemo } from 'react'

import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'

import style from './total-block.module.css';

import Modal from '../../modal/modal';
import OrderDetails from '../../order-details/order-details';

import { useSelector, useDispatch } from 'react-redux';

import { ORDER_CREATE, ORDER_CLOSE } from '../../../services/actions/order';

import { useNavigate } from 'react-router-dom';

export default function TotalBlock() {

    const dispatch = useDispatch();

    const { bun, ingredients } = useSelector(store => store.construct);
    const visible = useSelector(store => store.order.ingredients.length > 0);
    const { login } = useSelector(store => store.auth);
    const navigate = useNavigate();

    const disabledButton = !bun || ingredients.length == 0;

    const totalCost = useMemo(() => {
        const doubleBunCost = bun ? bun.price * 2 : 0;
        const ingridientsCost = ingredients.reduce((a, b) => a + (b.price), 0);
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

            dispatch({ type: ORDER_CREATE, value })
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