import React from 'react';
import PropTypes from 'prop-types';
import image  from "../../images/done.png";
import style from './order-details.module.css';

 export default function OrderDetails({order}) {
    return(
        <>
            <p className="text text_type_digits-large mt-20">{order}</p>
            <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
            <img alt="done image" src={image}  className={style.image} />
            <p className="text text_type_main-default mt-15">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default text_color_inactive mt-2 mb-30">Дождитесь готовности на орбитальной станции</p>
        </>
    )
}


OrderDetails.propTypes = {
    order: PropTypes.string.isRequired
}