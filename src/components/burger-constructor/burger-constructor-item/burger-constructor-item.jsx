
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag,useDrop } from "react-dnd";
import { useRef } from 'react';
import style from './burger-constructor-item.module.css';

import { COSTRUCTOR_ADD_ITEM, COSTRUCTOR_DELETE_ITEM } from '../../../services/actions/constructor';

import {  useDispatch } from 'react-redux';

export default function BurgerConstructorItem({ id, item, index, moveCard }) {

    const dispatch = useDispatch();

    const onDelete = () => {
        console.log(item)
        dispatch({
            type: COSTRUCTOR_DELETE_ITEM,
            uid : item.uid
        })
    }

    // const [, dragRef] = useDrag({
    //     type: 'sort',
    //     item: item
    // });

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

    return (
        <li className={style.item} ref={ref} >
            <span style={{ cursor: 'move' }}>
                <DragIcon type="primary" />
            </span>
            <ConstructorElement text={item.name} key={item._id}
                price={item.price} thumbnail={item.image} handleClose={onDelete}
            />
        </li>
    )

}