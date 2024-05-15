
import PropTypes from 'prop-types';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'

import style from './burger-ingredients.module.css';

import GroupIngredients from './group-ingredients/group-ingredients'

import ingredientType from "../../utils/types";

import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getIngredients } from '../../services/actions/ingredients';

import { INGREDIENTS_CHANGE_ACTIVE_TAB } from '../../services/actions/ingredients';


export default function BurgerIngredients() {

    // Получаем метод dispatch
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getIngredients())
    }, []);

    const { ingredients, ingredientsRequest, ingredientsFailed, activeTab } =
        useSelector(store => store.ingredients);

    const onClickTab = (value) => {

        dispatch({ type: INGREDIENTS_CHANGE_ACTIVE_TAB, value })
        //Scroll to value here
        const element = document.getElementById(value);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    }

    const generalRef = useRef(null);
    const bunRef = useRef(null);
    const sauceRef = useRef(null);
    const mainRef = useRef(null);
    const handleScroll = () => {
        const generalTop = generalRef.current.getBoundingClientRect().top;
        const bunDist = Math.abs(generalTop - bunRef.current.getBoundingClientRect().top)
        const sauceDist = Math.abs(generalTop - sauceRef.current.getBoundingClientRect().top)
        const mainDist = Math.abs(generalTop - mainRef.current.getBoundingClientRect().top)
        const minDist = Math.min(bunDist, sauceDist, mainDist);
        const value = minDist === bunDist ? 'bun' : minDist === sauceDist ? 'sauce' : 'main';
        if (value !== activeTab) {
            dispatch({ type: INGREDIENTS_CHANGE_ACTIVE_TAB, value })
        }
    }

    return (
        <>
            {ingredientsRequest && 'Загрузка...'}
            {ingredientsFailed && 'Произошла ошибка'}
            {!ingredientsRequest &&
                !ingredientsFailed &&
                ingredients &&

                <>
                    <div className={style.textleft}>
                        <span className="text text_type_main-large">Соберите бургер</span>
                    </div>
                    <div className={style.tabs}>
                        <Tab value="bun" active={activeTab === 'bun'} onClick={onClickTab}>Булки</Tab>
                        <Tab value="sauce" active={activeTab === 'sauce'} onClick={onClickTab}>Соусы</Tab>
                        <Tab value="main" active={activeTab === 'main'} onClick={onClickTab}>Начинки</Tab>
                    </div>
                    {/* TODO не понятно как сделать скролл как в макете */}
                    <div className={style.ingredients} onScroll={handleScroll} ref={generalRef}>
                        <GroupIngredients groupRef={bunRef} id={'bun'} title="Булки" elements={ingredients.filter(element => element.type === "bun")} />
                        <GroupIngredients groupRef={sauceRef} id={'sauce'} title="Соусы" elements={ingredients.filter(element => element.type === "sauce")} />
                        <GroupIngredients groupRef={mainRef} id={'main'} title="Начинки" elements={ingredients.filter(element => element.type === "main")} />
                    </div>
                </>}
        </>
    )
}

BurgerIngredients.propTypes = {
    allIngredients: PropTypes.arrayOf(ingredientType.isRequired)
}