
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag,useDrop } from "react-dnd";
import { useRef } from 'react';
import style from './burger-constructor-item.module.css';

import { COSTRUCTOR_DELETE_ITEM } from '../../../services/actions/constructor';

import {  useDispatch } from 'react-redux';

// sort impl from here: https://codesandbox.io/p/sandbox/react-dnd-simple-sort-4pwrw?
export default function BurgerConstructorItem({ id, item, index, moveCard }) {

    const dispatch = useDispatch();

    const onDelete = () => {
        dispatch({
            type: COSTRUCTOR_DELETE_ITEM,
            uid : item.uid
        })
    }

    const [{ isDragging }, drag] = useDrag({
        type: 'card',
        item: { type: 'card', id, index },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    })


    const ref = useRef(null)
    const [, drop] = useDrop({
        accept: 'card',
        hover(item, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index
            if (dragIndex === hoverIndex) {
                return
            }
            const hoverBoundingRect = ref.current.getBoundingClientRect()
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const clientOffset = monitor.getClientOffset()
            const hoverClientY = clientOffset.y - hoverBoundingRect.top
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            moveCard(dragIndex, hoverIndex)
            item.index = hoverIndex
        },
    })
    
    const opacity = isDragging ? 0 : 1
    drag(drop(ref))


//TODO •	при попытке «бросить» ингредиент за пределы BurgerConstructor ничего происходить не должно — ингредиент возвращается в исходное положение.
// не нашел решения

    return (
        <li className={style.item} ref={ref} style={{ ...style, opacity }} >
            <span style={{ cursor: 'move' }}>
                <DragIcon type="primary" />
            </span>
            <ConstructorElement text={item.name} key={item._id}
                price={item.price} thumbnail={item.image} handleClose={onDelete}
            />
        </li>
    )

}