
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import BurgerConstructorItem from './burger-constructor-item/burger-constructor-item';

import { useCallback } from 'react';

import style from './burger-constructor.module.css';

import TotalBlock from "./total-block/total-block";

import { useSelector, useDispatch } from 'react-redux';

import { useDrop } from "react-dnd";

import { COSTRUCTOR_ADD_ITEM, COSTRUCTOR_DELETE_ITEM } from '../../services/actions/constructor';
import update from 'immutability-helper';

import {COSTRUCTOR_RESORT} from '../../services/actions/constructor';


export default function BurgerConstructor() {

    const [, dropTarget] = useDrop({
        accept: "ingredient",
        drop(item) {
            onDropHandler(item);
        },
    });

    const onDropHandler = (item) => {
        dispatch({ type: COSTRUCTOR_ADD_ITEM, item })
    }

    const dispatch = useDispatch();

    const { bun, ingredients } = useSelector(store => store.construct);

    //console.log(ingredients);

    const moveCard = useCallback(
        
        (dragIndex, hoverIndex) => {
            //console.log("dragIndex " + dragIndex + " hoverIndex" + hoverIndex);
            const dragCard = ingredients[dragIndex]
            //console.log('fire')
            dispatch(
                {
                    type: COSTRUCTOR_RESORT,
                    value: update(ingredients, {
                        $splice: [
                            [dragIndex, 1],
                            [hoverIndex, 0, dragCard],
                        ],
                    }),
                }
            )
        },
        [ingredients],
    )




    const renderCard = (card, index) => {
        return (
            <BurgerConstructorItem
                key={card._id + "-" + index}
                index={index}
                
                item={card}
                moveCard={moveCard}
            />
        )
    }


    return (
        <section ref={dropTarget}>

            {/* top bread */}

            {
                bun && (<div className={style.top}>
                    <ConstructorElement type="top" isLocked={true}
                        text={bun.name + " (верх)"}
                        price={bun.price}
                        thumbnail={bun.image}
                    />
                </div>)}
            {
                !bun && (<div className={style.top}>
                    <ConstructorElement type="top" isLocked={true}
                        text="Выбирай булку и другие приколюхи..."
                        price={''}
                        thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
                    />
                </div>)}


            {/* filling (with scroll) */}
            {/* не понятно как сделать скролл как в макете */}
            <ul className={style.ulstyle}>

                {
                    ingredients && ingredients.map((card, i) => renderCard(card, i))
                }
                {
                    !ingredients && (
                        <li className={style.item}>
                            <DragIcon type="primary" />
                            <ConstructorElement text="А сюда начинку и не забудь про соус" on
                                price={''} thumbnail={'https://code.s3.yandex.net/react/code/sauce-03.png'}
                            />
                        </li>
                    )
                }
            </ul>
            {/* bottom bread */}
            {
                bun && (<div className={style.bottom}>
                    <ConstructorElement type="bottom" isLocked={true}
                        text={bun.name + " (низ)"}
                        price={bun.price}
                        thumbnail={bun.image}

                    />
                </div>)}
            <TotalBlock />
        </section>

    )

}

