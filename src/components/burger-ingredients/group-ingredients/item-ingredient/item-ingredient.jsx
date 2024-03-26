import React from 'react'
import PropTypes from 'prop-types';
import ingredientType from "../../../../utils/types";

import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

import style from './item-ingredient.module.css';

export default function ItemIngredient({ item, count, selectedHandler }) {

    return (
        <div className={style.item} onClick={() => selectedHandler(item)}>
            {count > 0 &&
                <div className={style.counter}>
                    <Counter count={count} size="default" extraClass="m-1" />
                </div>
            }
            <img src={item.image} alt={item.image} className='pl-4 pr-4' />
            <span className={style.currencyContainer}>
                <span className='text text_type_digits-default pr-2 pt-1' >{item.price}</span>
                <CurrencyIcon type="primary" />
            </span>
            <div className={style.name}>
                <span className="text text_type_main-default">{item.name}</span>
            </div>
        </div>
    )
}

ItemIngredient.propTypes = {
    item: ingredientType.isRequired,
    count: PropTypes.number.isRequired,
    selectedHandler: PropTypes.func.isRequired
}