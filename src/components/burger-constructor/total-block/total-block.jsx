import React from 'react'

import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'

import style from './total-block.module.css';

import Modal from '../../modal/modal';
import OrderDetails from '../../order-details/order-details';

import { useSelector } from 'react-redux';

export default function TotalBlock() {

    const [visibleModal, setVisibleModal] = React.useState(false);

    const {bun, ingredients} = useSelector(store => store.construct);

    const totalCost = () => {
        const dubleBunCost = bun ? bun.price * 2 : 0;
        const ingridientsCost = ingredients.reduce((a, b) => a + (b.price), 0);

        return dubleBunCost + ingridientsCost;
    }

    const onClickBtn = () => {
        //open modal here
        setVisibleModal(true);
    }

    const closeModalHandle = () => {
        setVisibleModal(false);
    }

    return (
        <div className={style.order}>
            <span className="text text_type_digits-medium">{totalCost()}</span>

            <div className={style.currencyicon} ><CurrencyIcon type="primary" /></div>
            <Button onClick={onClickBtn} htmlType="button" type="primary" size="large" extraClass="ml-10">Оформить заказ</Button>

            {visibleModal &&
                <Modal onCloseHandle={closeModalHandle}>
                    <OrderDetails order={'034536'} />
                </Modal>}

        </div>
    )
}