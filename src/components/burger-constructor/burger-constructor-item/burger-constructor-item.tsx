import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { DropTargetMonitor, XYCoord, useDrag, useDrop } from "react-dnd";
import { useRef } from "react";
import style from "./burger-constructor-item.module.css";

import { CONSTRUCTOR_DELETE_ITEM } from "../../../services/actions/constructor";

import { useDispatch } from "react-redux";

interface IMovieProps {
  //id: number;
  item: any;
  index: number;
  moveCard: any;
}

// sort impl from here: https://codesandbox.io/p/sandbox/react-dnd-simple-sort-4pwrw?
export const BurgerConstructorItem: React.FC<IMovieProps> = ({
  item,
  index,
  moveCard,
}) => {
  const dispatch = useDispatch();

  const onDelete = () => {
    dispatch({
      type: CONSTRUCTOR_DELETE_ITEM,
      uid: item.uid,
    });
  };

  const [{ isDragging }, drag] = useDrag({
    type: "card",
    item: { type: "card", index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const ref = useRef<HTMLLIElement>(null);
  const [, drop] = useDrop({
    accept: "card",
    hover(item: any, monitor: DropTargetMonitor<unknown, unknown>) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset2: XYCoord | null = monitor.getClientOffset();
      const clientOffset = clientOffset2 as XYCoord; //todo check if not null
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  //TODO •	при попытке «бросить» ингредиент за пределы BurgerConstructor ничего происходить не должно — ингредиент возвращается в исходное положение.
  // не нашел решения

  return (
    <li className={style.item} ref={ref} style={{ ...style, opacity }}>
      <span style={{ cursor: "move" }}>
        <DragIcon type="primary" />
      </span>
      <ConstructorElement
        text={item.name}
        key={item._id}
        price={item.price}
        thumbnail={item.image}
        handleClose={onDelete}
      />
    </li>
  );
};
