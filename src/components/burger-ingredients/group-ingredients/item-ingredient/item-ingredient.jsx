import React from 'react'

import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

import style from './item-ingredient.module.css';

export default function ItemIngredient({ item, count, selectedHandler }) {

    return (
        <div style={{ display: 'grid', width: '272px', cursor: 'pointer' }} className='m-3' onClick={() => selectedHandler(item)}>
            {count > 0 &&
                <div className={style.counter}>
                    <Counter count={count} size="default" extraClass="m-1" />
                </div>
            }
            <img src={item.image} className='pl-4 pr-4' />
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} className='pt-1'>
                <span className='text text_type_digits-default pr-2 pt-1' >{item.price}</span>
                <CurrencyIcon type="primary" />
            </span>
            <span style={{ textAlign: 'center' }} className="text text_type_main-default pt-2"> {item.name}</span>
        </div>
    )
}