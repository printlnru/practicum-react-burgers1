import image from "../../images/done.png";
import style from './order-details.module.css';

import { createOrder } from '../../services/actions/order';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../..';

export default function OrderDetails() {

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(createOrder(ingredients))
    }, []);

    const { inProgress, successStatus, failedStatus, order, ingredients } = useAppSelector(store => store.order);

    return (
        <>
            {
                inProgress && <p >there will be a loader here</p>
            }
            {
                !inProgress && failedStatus && <p >there will be an error message here</p>
            }
            {
                successStatus && (
                    <>
                        <p className="text text_type_digits-large mt-20">{order}</p>
                        <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
                        <img alt="done image" src={image} className={style.image} />
                        <p className="text text_type_main-default mt-15">Ваш заказ начали готовить</p>
                        <p className="text text_type_main-default text_color_inactive mt-2 mb-30">Дождитесь готовности на орбитальной станции</p>
                    </>
                )
            }

        </>

    )
}