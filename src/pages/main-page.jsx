
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';

import style from './main-page.module.css';

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";


export default function MainPage() {
    return (
        <DndProvider backend={HTML5Backend}>
            <div className={style.col1}>
                <BurgerIngredients />
            </div>
            <div className={style.col2}>
                <BurgerConstructor />
            </div>
        </DndProvider>
    );
}