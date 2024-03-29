import React from 'react'

import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'

import style from './total-block.module.css';

import Modal from '../../modal/modal';
import OrderDetails from '../../order-details/order-details';

export default function TotalBlock() {

    const [visibleModal, setVisibleModal] = React.useState(false);

    const onClickBtn = () => {
        //open modal here
        setVisibleModal(true);
    }

    const closeModalHandle = () => {
        setVisibleModal(false);
    }

    return (
        <div className={style.order}>
            <span className="text text_type_digits-medium">610</span>

            <div className={style.currencyicon} ><CurrencyIcon type="primary" /></div>
            <Button onClick={onClickBtn} htmlType="button" type="primary" size="large" extraClass="ml-10">Оформить заказ</Button>

            {visibleModal &&
                <Modal onCloseHandle={closeModalHandle}>
                    <OrderDetails order={'034536'} />
                </Modal>}

        </div>
    )
}