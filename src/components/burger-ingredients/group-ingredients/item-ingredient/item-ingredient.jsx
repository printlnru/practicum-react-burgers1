import React from 'react'
import PropTypes from 'prop-types';
import ingredientType from "../../../../utils/types";

import { useDrag } from "react-dnd";

import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

import style from './item-ingredient.module.css';

import { useSelector, useDispatch } from 'react-redux';
import {CURRENT_INGREDIENTS_LOAD} from '../../../../services/actions/current-ingredient';

export default function ItemIngredient({ item }) {
    const dispatch = useDispatch();

    const [, dragRef] = useDrag({
        type: 'ingredient',
        item: item
    });

    const count = useSelector(store => item.type === 'bun' 
    ? (store.construct.bun && store.construct.bun._id === item._id ? 2 : 0)
    : store.construct.ingredients.filter(e => e._id === item._id).length);

    const selectedHandler = (item) => {
        dispatch({type: CURRENT_INGREDIENTS_LOAD, value: item})
    }

    return (
        <div className={style.item} onClick={() => selectedHandler(item)} ref={dragRef}>
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
    //count: PropTypes.number.isRequired,
    //selectedHandler: PropTypes.func.isRequired
}