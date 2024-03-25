import React from 'react'

import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import style from './burger-constructor.module.css';

import TotalBlock from "./total-block/total-block";

export default function BurgerConstructor() {

    return (
        <section>
            
                {/* top bread */}
                <div className={style.top}>
                    <ConstructorElement type="top" isLocked={true}
                        text="Краторная булка N-200i (верх)"
                        price={20}
                        thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
                    />
                </div>

                {/* filling (with scroll) */}
                {/* не понятно как сделать скролл как в макете */}
                <ul className={style.ulstyle}>
                <li className={style.item}>
                    <DragIcon type="primary"/>
                    <ConstructorElement text="Соус традиционный галактический"
                        price={30} thumbnail={'https://code.s3.yandex.net/react/code/sauce-03.png'}
                    />
                </li>


{/* Для отрисовки однотипной верстки принято использовать массив и его метод map, чтобы не дублировать код. И обязательно нужно добавлять уникальный атрибут key при этом. */}
{/* если комментарий про это, то при реализации функционала так и планируется сделать. в данном случае этот код временный для того чтобы посмотреть как это выглядит */}
<li className={style.item}><DragIcon type="primary"/><ConstructorElement text="Соус традиционный галактический" price={30} thumbnail={'https://code.s3.yandex.net/react/code/sauce-03.png'}/></li>
<li className={style.item}><DragIcon type="primary"/><ConstructorElement text="Соус традиционный галактический" price={30} thumbnail={'https://code.s3.yandex.net/react/code/sauce-03.png'}/></li>
<li className={style.item}><DragIcon type="primary"/><ConstructorElement text="Соус традиционный галактический" price={30} thumbnail={'https://code.s3.yandex.net/react/code/sauce-03.png'}/></li>
<li className={style.item}><DragIcon type="primary"/><ConstructorElement text="Соус традиционный галактический" price={30} thumbnail={'https://code.s3.yandex.net/react/code/sauce-03.png'}/></li>
<li className={style.item}><DragIcon type="primary"/><ConstructorElement text="Соус традиционный галактический" price={30} thumbnail={'https://code.s3.yandex.net/react/code/sauce-03.png'}/></li>
<li className={style.item}><DragIcon type="primary"/><ConstructorElement text="Соус традиционный галактический" price={30} thumbnail={'https://code.s3.yandex.net/react/code/sauce-03.png'}/></li>
<li className={style.item}><DragIcon type="primary"/><ConstructorElement text="Соус традиционный галактический" price={30} thumbnail={'https://code.s3.yandex.net/react/code/sauce-03.png'}/></li>
<li className={style.item}><DragIcon type="primary"/><ConstructorElement text="Соус традиционный галактический" price={30} thumbnail={'https://code.s3.yandex.net/react/code/sauce-03.png'}/></li>



                </ul>
                {/* bottom bread */}
                <div className={style.bottom}>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text="Краторная булка N-200i (низ)"
                        price={20}
                        thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
                    />
                </div>
            

            <TotalBlock />
        </section>

    )

}

